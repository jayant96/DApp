import * as React from 'react'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

export default function Imprint(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={0} lg={2}></Grid>
      <Grid item xs={8}>
        <Typography variant="h3">Legal Notice</Typography>
        <Typography variant="body1">
          Information in accordance with §5 of the E-Commerce Act, §14 of the
          Unternehmensgesetzbuch, §63 of the Commercial Code and disclosure
          requirements under §25 of the Media Act.
        </Typography>
        <Typography variant="body1">
          Laid Back Ventures GmbH<br/>
          Elsenheimerstr. 48 <br />
          80687 München <br />
          Germany
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong>{' '}
          <Link href="mailto:info@apeharbour.com">info@apeharbour.com</Link>
        </Typography>
        <Typography variant="body1">
          <strong>Contact details of the data protection controller</strong>
          <br />
          If you have any question about data protection, please find the
          contact details of the body responsible for data protection below:
          <br />
          Laid Back Ventures GmbH
          <br />
          Elsenheimerstr. 48
          <br />
          80687 München
          <br />
          E-Mail: <Link href="mailto:info@apeharbour.com">info@apeharbour.com</Link>
        </Typography>

        <Typography variant="body1">All texts are copyrighted.</Typography>

        <Typography variant="h3">Privacy Policy</Typography>
        <Typography variant="body1">
          We have written this privacy policy (version 21.09.2021-311832766) in
          order to explain to you, in accordance with the provisions of the{' '}
          <Link
            href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex%3A32016R0679&amp;amp%3Btid=%5Badsimpletextid]"
            target="_blank"
            rel="noopener"
          >
            General Data Protection Regulation (EU) 2016/679
          </Link>{' '}
          and applicable national laws, which personal data (data for short) we
          as the controller – and the processors commissioned by us (e.g.
          providers) – process, will process in the future and what legal
          options you have. The terms used are to be considered as
          gender-neutral.
          <br />
          <strong>In short:</strong> We provide you with comprehensive
          information about any personal data we process about you.
        </Typography>
        <Typography variant="body1">
          Privacy policies usually sound very technical and use legal
          terminology. However, this privacy policy is intended to describe the
          most important things to you as simply and transparently as possible.
          So long as it aids transparency, technical{' '}
          <strong>
            terms are explained in a reader-friendly manner, links
          </strong>{' '}
          to further information are provided and <strong>graphics</strong> are
          used. We are thus informing in clear and simple language that we only
          process personal data in the context of our business activities if
          there is a legal basis for it. This is certainly not possible with
          brief, unclear and legal-technical statements, as is often standard on
          the Internet when it comes to data protection. I hope you find the
          following explanations interesting and informative. Maybe you will
          also find some information that you have not been familiar with.
          <br />
          If you still have questions, we would like to ask you to contact the
          responsible body named below or in the imprint, to follow the existing
          links and to look at further information on third-party sites. You can
          of course also find our contact details in the imprint.
        </Typography>
        <Typography variant="h4">Scope</Typography>
        <Typography variant="body1">
          This privacy policy applies to all personal data processed by our
          company and to all personal data processed by companies commissioned
          by us (processors). With the term personal data, we refer to
          information within the meaning of Article 4 No. 1 GDPR, such as the
          name, email address and postal address of a person. The processing of
          personal data ensures that we can offer and invoice our services and
          products, be it online or offline. The scope of this privacy policy
          includes:
        </Typography>
        <ul>
          <li>all online presences (websites, online shops) that we operate</li>
          <li>Social media presences and email communication</li>
          <li>mobile apps for smartphones and other devices</li>
        </ul>
        <Typography variant="body1">
          <strong>In short:</strong> This privacy policy applies to all areas in
          which personal data is processed in a structured manner by the company
          via the channels mentioned. Should we enter into legal relations with
          you outside of these channels, we will inform you separately if
          necessary.
        </Typography>
        <Typography variant="h4">Legal bases</Typography>
        <Typography variant="body1">
          In the following privacy policy, we provide you with transparent
          information on the legal principles and regulations, i.e. the legal
          bases of the General Data Protection Regulation, which enable us to
          process personal data.
          <br />
          Whenever EU law is concerned, we refer to REGULATION (EU) 2016/679 OF
          THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of April 27, 2016. You can
          of course access the General Data Protection Regulation of the EU
          online at EUR-Lex, the gateway to EU law, at{' '}
          <Link
            href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&amp;tid=311832766"
            target="_blank"
            rel="noopener"
          >
            https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32016R0679
          </Link>
          .
        </Typography>
        <Typography variant="body1">
          We only process your data if at least one of the following conditions
          applies:
        </Typography>
        <ol>
          <li>
            <strong>Consent</strong> (Article 6 Paragraph 1 lit. a GDPR): You
            have given us your consent to process data for a specific purpose.
            An example would be the storage of data you entered into a contact
            form.
          </li>
          <li>
            <strong>Contract</strong> (Article 6 Paragraph 1 lit. b GDPR): We
            process your data in order to fulfill a contract or pre-contractual
            obligations with you. For example, if we conclude a sales contract
            with you, we need personal information in advance.
          </li>
          <li>
            <strong>Legal obligation</strong> (Article 6 Paragraph 1 lit. c
            GDPR): If we are subject to a legal obligation, we will process your
            data. For example, we are legally required to keep invoices for our
            bookkeeping. These usually contain personal data.
          </li>
          <li>
            <strong>Legitimate interests</strong> (Article 6 Paragraph 1 lit. f
            GDPR): In the case of legitimate interests that do not restrict your
            basic rights, we reserve the right to process personal data. For
            example, we have to process certain data in order to be able to
            operate our website securely and economically. Therefore, the
            processing is a legitimate interest.
          </li>
        </ol>
        <Typography variant="body1">
          Other conditions such as making recordings in the interest of the
          public, the exercise of official authority as well as the protection
          of vital interests do not usually occur with us. Should such a legal
          basis be relevant, it will be disclosed in the appropriate place.
        </Typography>
        <Typography variant="body1">
          In addition to the EU regulation, national laws also apply:
        </Typography>
        <ul>
          <li>
            In <strong>Austria</strong> this is the Austrian Data Protection Act
            (<strong>Datenschutzgesetz</strong>), in short <strong>DSG</strong>.
          </li>
          <li>
            In <strong>Germany</strong> this is the Federal Data Protection Act
            (<strong>Bundesdatenschutzgesetz</strong>), in short{' '}
            <strong>BDSG</strong>.
          </li>
        </ul>
        <Typography variant="body1">
          Should other regional or national laws apply, we will inform you about
          them in the following sections.
        </Typography>
        <Typography variant="h4">
          Contact details of the data protection controller
        </Typography>
        <Typography variant="body1">
          If you have any questions about data protection, you will find the
          contact details of the responsible person or controller below:
          <br />
          Laid Back Ventures GmbH
          <br />
          Elsenheimerstr. 48
          <br />
          80687 München
          <br />
          Authorised to represent:
          <br />
          Email: <Link href="mailto:info@apeharbour.com">info@apeharbour.com</Link>
          <br />
          Phone: <br />
        </Typography>
        <Typography variant="h4">Storage Period</Typography>
        <Typography variant="body1">
          It is a general criterion for us to store personal data only for as
          long as is absolutely necessary for the provision of our services and
          products. This means that we delete personal data as soon as any
          reason for the data processing no longer exists. In some cases, we are
          legally obliged to keep certain data stored even after the original
          purpose no longer exists, such as for accounting purposes.
        </Typography>
        <Typography variant="body1">
          If you want your data to be deleted or if you want to revoke your
          consent to data processing, the data will be deleted as soon as
          possible, provided there is no obligation to continue its storage.
        </Typography>
        <Typography variant="body1">
          We will inform you below about the specific duration of the respective
          data processing, provided we have further information.
        </Typography>
        <Typography variant="h4">
          Rights in accordance with the General Data Protection Regulation
        </Typography>
        <Typography variant="body1">
          You are granted the following rights in accordance with the provisions
          of the{' '}
          <Link href="https://gdpr-info.eu/" target="_blank" rel="noopener">
            GDPR
          </Link>{' '}
          (General Data Protection Regulation) and the Austrian{' '}
          <Link
            href="https://www.ris.bka.gv.at/Dokumente/Erv/ERV_1999_1_165/ERV_1999_1_165.html"
            target="_blank"
            rel="noopener"
          >
            Data Protection Act (DSG)
          </Link>
          :
        </Typography>
        <ul>
          <li>right to rectification (article 16 GDPR)</li>
          <li>right to erasure (“right to be forgotten“) (article 17 GDPR)</li>
          <li>right to restrict processing (article 18 GDPR)</li>
          <li>
            righ to notification – notification obligation regarding
            rectification or erasure of personal data or restriction of
            processing (article 19 GDPR)
          </li>
          <li>right to data portability (article 20 GDPR)</li>
          <li>Right to object (article 21 GDPR)</li>
          <li>
            right not to be subject to a decision based solely on automated
            processing – including profiling – (article 22 GDPR)
          </li>
        </ul>
        <Typography variant="body1">
          If you think that the processing of your data violates the data
          protection law, or that your data protection rights have been
          infringed in any other way, you can lodge a complaint with your
          respective regulatory authority. For Austria this is the data
          protection authority, whose website you can access at{' '}
          <Link href="https://www.data-protection-authority.gv.at/?tid=311832766">
            https://www.data-protection-authority.gv.at/
          </Link>
          .
        </Typography>
        <Typography variant="h4">Bayern Data protection authority</Typography>
        <Typography variant="body1">
          <strong>State Commissioner for Data Protection:</strong> Prof. Dr.
          Thomas Petri
          <br />
          <strong>Address:</strong> Wagmüllerstr. 18, 80538 München
          <br />
          <strong>Phone number:</strong> 089/21 26 72-0
          <br />
          <strong>E-mail address:</strong> poststelle@datenschutz-bayern.de
          <br />
          <strong>Website: </strong>
          <Link
            href="https://www.datenschutz-bayern.de/?tid=311832766"
            target="_blank"
            rel="noopener"
          >
            https://www.datenschutz-bayern.de/
          </Link>
        </Typography>
        <Typography variant="h4">Data transfer to third countries</Typography>
        <Typography variant="body1">
          We only transfer or process data to countries outside the EU (third
          countries) if you consent to this processing, if this is required by
          law or if it is contractually necessary. In any case, we generally
          only do so to the permitted extent. In most cases, your consent is the
          most important reason for data being processed in third countries.
          When personal data is being processed in third countries such as the
          USA, where many software manufacturers offer their services and have
          their servers located, your personal data may be processed and stored
          in unexpected ways.
        </Typography>
        <Typography variant="body1">
          We want to expressly point out, that according to the European Court
          of Justice, there is currently no adequate level of protection for
          data transfer to the USA. Data processing by US services (such as
          Google Analytics) may result in data processing and retention without
          the data having undergone anonymisation processes. Furthermore, US
          government authorities may be able to access individual data. The
          collected data may also get linked to data from other services of the
          same provider, should you have a user account with the respective
          provider. We try to use server locations within the EU, whenever this
          is offered and possible.
        </Typography>
        <Typography variant="body1">
          We will provide you with more details about data transfer to third
          countries in the appropriate sections of this privacy policy, whenever
          applicable.
        </Typography>
        <Typography variant="h4">
          Security of data processing operations
        </Typography>
        <Typography variant="body1">
          In order to protect personal data, we have implemented both technical
          and organisational measures. We encrypt or pseudonymise personal data
          wherever this is possible. Thus, we make it as difficult as we can for
          third parties to extract personal information from our data.
        </Typography>
        <Typography variant="body1">
          Article 25 of the GDPR refers to “data protection by technical design
          and by data protection-friendly default” which means that both
          software (e.g. forms) and hardware (e.g. access to server rooms)
          appropriate safeguards and security measures shall always be placed.
          If applicable, we will outline the specific measures below.
        </Typography>
        <Typography variant="h4">TLS encryption with https</Typography>
        <Typography variant="body1">
          The terms TLS, encryption and https sound very technical, which they
          are indeed. We use HTTPS (Hypertext Transfer Protocol Secure) to
          securely transfer data on the Internet.
          <br />
          This means that the entire transmission of all data from your browser
          to our web server is secured &#8211; nobody can &#8220;listen
          in&#8221;.
        </Typography>
        <Typography variant="body1">
          We have thus introduced an additional layer of security and meet
          privacy requirements through technology design{' '}
          <Link
            href="https://eur-lex.europa.eu/legal-content/en/TXT/HTML/?uri=CELEX:32016R0679&amp;from=EN&amp;tid=311832766"
            target="_blank"
            rel="noopener"
          >
            Article 25 Section 1 GDPR
          </Link>
          ). With the use of TLS (Transport Layer Security), which is an
          encryption protocol for safe data transfer on the internet, we can
          ensure the protection of confidential information.
          <br />
          You can recognise the use of this safeguarding tool by the little
          lock-symbol{' '}
          <img
            loading="lazy"
            role="img"
            src="https://www.adsimple.at/wp-content/uploads/2018/03/schlosssymbol-https-211141072.svg"
            width="17"
            height="18"
          />
          , which is situated in your browser’s top left corner in the left of
          the internet address (e.g. examplepage.uk), as well as by the display
          of the letters https (instead of http) as a part of our web address.
          <br />
          If you want to know more about encryption, we recommend you to do a
          Google search for "Hypertext Transfer Protocol Secure
          wiki" to find good links to further information.
        </Typography>
        <Typography variant="h4">Communications</Typography>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Communications Overview</strong>
                <br />
                👥 Affected parties: Anyone who communicates with us via phone,
                email or online form
                <br />
                📓 Processed data: e. g. telephone number, name, email address
                or data entered in forms. You can find more details on this
                under the respective form of contact
                <br />
                🤝 Purpose: handling communication with customers, business
                partners, etc.
                <br />
                📅 Storage duration: for the duration of the business case and
                the legal requirements
                <br />
                ⚖️ Legal basis: Article 6 (1) (a) GDPR (consent), Article 6 (1)
                (b) GDPR (contract), Article 6 (1) (f) GDPR (legitimate
                interests)
              </td>
            </tr>
          </tbody>
        </table>
        <Typography variant="body1">
          If you contact us and communicate with us via phone, email or online
          form, your personal data may be processed.
        </Typography>
        <Typography variant="body1">
          The data will be processed for handling and processing your request
          and for the related business transaction. The data is stored for this
          period of time or for as long as is legally required.
        </Typography>
        <Typography variant='h3'>Affected persons</Typography>
        <Typography variant="body1">
          The above-mentioned processes affect all those who seek contact with
          us via the communication channels we provide.
        </Typography>
        <Typography variant='h3'>Telephone</Typography>
        <Typography variant="body1">
          When you call us, the call data is stored in a pseudonymised form on
          the respective terminal device, as well as by the telecommunications
          provider that is being used. In addition, data such as your name and
          telephone number may be sent via email and stored for answering your
          inquiries. The data will be erased as soon as the business case has
          ended and the legal requirements allow for its erasure.
        </Typography>
        <Typography variant='h3'>Email</Typography>
        <Typography variant="body1">
          If you communicate with us via email, your data is stored on the
          respective terminal device (computer, laptop, smartphone, &#8230;) as
          well as on the email server. The data will be deleted as soon as the
          business case has ended and the legal requirements allow for its
          erasure.
        </Typography>
        <Typography variant='h3'>Online forms</Typography>
        <Typography variant="body1">
          If you communicate with us using an online form, your data is stored
          on our web server and, if necessary, forwarded to our email address.
          The data will be erased as soon as the business case has ended and the
          legal requirements allow for its erasure.
        </Typography>
        <Typography variant='h3'>Legal bases</Typography>
        <Typography variant="body1">
          Data processing is based on the following legal bases:
        </Typography>
        <ul>
          <li>
            Art. 6 para. 1 lit. a GDPR (consent): You give us your consent to
            store your data and to continue to use it for the purposes of the
            business case;
          </li>
          <li>
            Art. 6 para. 1 lit. b GDPR (contract): For the performance of a
            contract with you or a processor such as a telephone provider, or if
            we have to process the data for pre-contractual activities, such as
            preparing an offer;
          </li>
          <li>
            Art. 6 para. 1 lit. f GDPR (legitimate interests): We want to
            conduct our customer inquiries and business communication in a
            professional manner. Thus, certain technical facilities such email
            programs, Exchange servers and mobile network operators are
            necessary to efficiently operate our communications.
          </li>
        </ul>
        <Typography variant="h4">Web hosting</Typography>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Web hosting Overview</strong>
                <br />
                👥 Affected parties: visitors to the website
                <br />
                🤝 Purpose: professional hosting of the website and security of
                operations
                <br />
                📓 Processed data: IP address, time of website visit, browser
                used and other data. You can find more details on this below or
                at the respective web hosting provider.
                <br />
                📅 Storage period: dependent on the respective provider, but
                usually 2 weeks
                <br />
                ⚖️ Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate
                interests)
              </td>
            </tr>
          </tbody>
        </table>
        <Typography variant="h5">What is web hosting?</Typography>
        <Typography variant="body1">
          Every time you visit a website nowadays, certain information &#8211;
          including personal data &#8211; is automatically created and stored,
          including on this website. This data should be processed as sparingly
          as possible, and only with good reason. By website, we mean the
          entirety of all websites on your domain, i.e. everything from the
          homepage to the very last subpage (like this one here). By domain we
          mean example.uk or examplepage.com.
        </Typography>
        <Typography variant="body1">
          When you want to view a website on a screen, you use a program called
          a web browser. You probably know the names of some web browsers:
          Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari.
        </Typography>
        <Typography variant="body1">
          The web browser has to connect to another computer which stores the
          website&#8217;s code: the web server. Operating a web server is
          complicated and time-consuming, which is why this is usually done by
          professional providers. They offer web hosting and thus ensure the
          reliable and flawless storage of website data.
        </Typography>
        <Typography variant="body1">
          Whenever the browser on your computer establishes a connection
          (desktop, laptop, smartphone) and whenever data is being transferred
          to and from the web server, personal data may be processed. After all,
          your computer stores data, and the web server also has to retain the
          data for a period of time in order to ensure it can operate properly.
        </Typography>

        <Typography variant="h5">Why do we process personal data?</Typography>
        <Typography variant="body1">
          The purposes of data processing are:
        </Typography>
        <ol>
          <li>Professional hosting of the website and operational security.</li>
          <li>To maintain the operational as well as IT security.</li>
          <li>
            Anonymous evaluation of access patterns to improve our offer, and if
            necessary, for prosecution or the pursuit of claims.
          </li>
        </ol>
        <Typography variant="h5">Which data are processed?</Typography>
        <Typography variant="body1">
          Even while you are visiting our website, our web server, that is the
          computer on which this website is saved, usually automatically saves
          data such as
        </Typography>
        <ul>
          <li>
            the full address (URL) of the accessed website (e. g.
            https://www.examplepage.uk/examplesubpage.html?tid=311832766)
          </li>
          <li>browser and browser version (e.g. Chrome 87)</li>
          <li>the operating system used (e.g. Windows 10)</li>
          <li>
            the address (URL) of the previously visited page (referrer URL) (e.
            g. https://www.examplepage.uk/icamefromhere.html/)
          </li>
          <li>
            the host name and the IP address of the device from the website is
            being accessed from (e.g. COMPUTERNAME and 194.23.43.121)
          </li>
          <li>date and time</li>
          <li>in so-called web server log files</li>
        </ul>
        <Typography variant="h5">How long is the data stored?</Typography>
        <Typography variant="body1">
          Generally, the data mentioned above are stored for two weeks and are
          then automatically deleted. We do not pass these data on to others,
          but we cannot rule out the possibility that this data may be viewed by
          the authorities in the event of illegal conduct.
        </Typography>
        <Typography variant="body1">
          <strong>In short:</strong> Your visit is logged by our provider
          (company that runs our website on special computers (servers)), but we
          do not pass on your data without your consent!
        </Typography>
        <Typography variant='h3'>Legal basis</Typography>
        <Typography variant="body1">
          The lawfulness of processing personal data in the context of web
          hosting is justified in Art. 6 para. 1 lit. f GDPR (safeguarding of
          legitimate interests), as the use of professional hosting with a
          provider is necessary to present the company in a safe and
          user-friendly manner on the internet, as well as to have the ability
          to track any attacks and claims, if necessary.
        </Typography>
        <Typography variant="h4">
          Amazon Web Services (AWS) Privacy Policy
        </Typography>
        <Typography variant="body1">
          We use Amazon Web Services (AWS) for our website, which is a web
          hosting provider, among other things. The provider of this service is
          the American company Amazon Web Services, Inc., 410 Terry Avenue
          North, Seattle WA 98109, USA.
        </Typography>
        <Typography variant="body1">
          Amazon Web Services (AWS) also processes data in the USA, among other
          countries. We would like to note, that according to the European Court
          of Justice, there is currently no adequate level of protection for
          data transfers to the USA. This can be associated with various risks
          to the legality and security of data processing.
        </Typography>
        <Typography variant="body1">
          Amazon Web Services (AWS) uses standard contractual clauses approved
          by the EU Commission as basis for data processing by recipients based
          in third countries (outside the European Union, Iceland,
          Liechtenstein, Norway and especially in the USA) or data transfer
          there (= Art. 46, paragraphs 2 and 3 of the GDPR). These clauses
          oblige Amazon Web Services (AWS) to comply with the EU‘s level of data
          protection when processing relevant data outside the EU. These clauses
          are based on an implementing order by the EU Commission. You can find
          the order and the clauses here:{' '}
          <Link href="https://ec.europa.eu/commission/presscorner/detail/en/ip_21_2847">
            https://ec.europa.eu/commission/presscorner/detail/en/ip_21_2847
          </Link>
        </Typography>
        <Typography variant="body1">
          You can find out more about the data that are processed through the
          use of Amazon Web Services (AWS) in their Privacy Policy at{' '}
          <Link
            href="https://aws.amazon.com/privacy/?nc1=h_ls"
            target="_ blank"
            rel="noopener"
          >
            https://aws.amazon.com/privacy/?nc1=h_ls
          </Link>
          .
        </Typography>
        <Typography variant="body1">All texts are copyrighted.</Typography>
      </Grid>
      <Grid item xs={0} lg={2}></Grid>
    </Grid>
  )
}
