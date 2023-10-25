#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { InfrastructureStack } = require('../lib/infrastructure-stack');

const app = new cdk.App();
const appName = app.node.tryGetContext('app_name')
const repo = app.node.tryGetContext('repo')
const owner = app.node.tryGetContext('owner')
const connectionArn = app.node.tryGetContext('connectionArn')
const domainNamesDev = app.node.tryGetContext('domainNames_dev')
const domainNamesProd = app.node.tryGetContext('domainNames_prod')
const certificateArn = app.node.tryGetContext('certificateArn')

const stageDev = 'dev';
new InfrastructureStack(app, stageDev + '-' + appName + '-Stack', {
  appName: appName,
  stage: stageDev,
  owner: owner,
  repo: repo,
  branch: 'dev',
  domainNames: domainNamesDev,
  connectionArn: connectionArn,
  certificateArn: certificateArn,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const stageProd = 'prod'
new InfrastructureStack(app, stageProd + '-' + appName + '-Stack', {
  appName: appName,
  stage: stageProd,
  owner: owner,
  repo: repo,
  branch: 'main',
  domainNames: domainNamesProd,
  connectionArn: connectionArn,
  certificateArn: certificateArn,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
