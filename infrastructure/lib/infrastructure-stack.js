const { Stack, Duration } = require('aws-cdk-lib')
const { Bucket, BucketAccessControl } = require('aws-cdk-lib/aws-s3')
const { BucketDeployment, Source } = require('aws-cdk-lib/aws-s3-deployment')
const {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
  PriceClass,
} = require('aws-cdk-lib/aws-cloudfront')
const { S3Origin } = require('aws-cdk-lib/aws-cloudfront-origins')
const path = require('path')
const { Pipeline, Artifact } = require('aws-cdk-lib/aws-codepipeline')
const {
  CodeStarConnectionsSourceAction,
  CodeBuildAction,
  S3DeployAction,
} = require('aws-cdk-lib/aws-codepipeline-actions')
const {
  PipelineProject,
  BuildSpec,
  LinuxBuildImage,
} = require('aws-cdk-lib/aws-codebuild')
const { Certificate } = require('aws-cdk-lib/aws-certificatemanager')
const { PolicyStatement } = require('aws-cdk-lib/aws-iam')

class InfrastructureStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    const stageName = props.stage + '-' + props.appName

    // bucket for website code
    const bucket = new Bucket(this, 'Bucket', {
      accessControl: BucketAccessControl.PRIVATE,
    })

    // OAI
    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'OriginAccessIdentity',
    )
    bucket.grantRead(originAccessIdentity)

    // CloudFront distribution
    const distribution = new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      enableLogging: true,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      domainNames: props.domainNames,
      certificate: Certificate.fromCertificateArn(
        this,
        'Certificate',
        props.certificateArn,
      ),
      priceClass: PriceClass.PRICE_CLASS_100,
    })

    // Create the build project that will invalidate the cache
    const invalidateBuildProject = new PipelineProject(
      this,
      `InvalidateProject`,
      {
        buildSpec: BuildSpec.fromObject({
          version: '0.2',
          phases: {
            build: {
              commands: [
                'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"',
              ],
            },
          },
        }),
        environmentVariables: {
          CLOUDFRONT_ID: { value: distribution.distributionId },
        },
      },
    )


    // Add Cloudfront invalidation permissions to the project
    const distributionArn = `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`
    invalidateBuildProject.addToRolePolicy(
      new PolicyStatement({
        resources: [distributionArn],
        actions: ['cloudfront:CreateInvalidation'],
      }),
    )

    // CodePipeline
    const pipeline = new Pipeline(this, 'CodePipeline')

    const sourceArtifact = new Artifact()
    const sourceStage = pipeline.addStage({ stageName: 'Source' })
    sourceStage.addAction(
      new CodeStarConnectionsSourceAction({
        actionName: 'GitHub_Source',
        owner: props.owner,
        repo: props.repo,
        branch: props.branch,
        output: sourceArtifact,
        connectionArn: props.connectionArn,
      }),
    )

    const buildStage = pipeline.addStage({ stageName: 'Build' })
    const buildArtifact = new Artifact()
    buildStage.addAction(
      new CodeBuildAction({
        input: sourceArtifact,
        outputs: [buildArtifact],
        actionName: 'Build',
        project: new PipelineProject(this, 'StaticSiteBuildProject', {
          buildSpec: BuildSpec.fromSourceFilename('website/buildspec.yaml'),
          environment: {
            buildImage: LinuxBuildImage.AMAZON_LINUX_2_4,
          },
        }),
      }),
    )

    const deployStage = pipeline.addStage({ stageName: 'Deploy' })
    deployStage.addAction(
      new S3DeployAction({
        actionName: 'Deploy_S3',
        input: buildArtifact,
        bucket: bucket,
      }),
    )

    const invalidateStage = pipeline.addStage({ stageName: 'Invalidate' })
    invalidateStage.addAction(
      new CodeBuildAction({
        actionName: 'InvalidateCache',
        project: invalidateBuildProject,
        input: buildArtifact,
        runOrder: 2,
      }),
    )
  }
}

module.exports = { InfrastructureStack }
