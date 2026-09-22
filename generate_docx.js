const fs = require('fs');
const HTMLtoDOCX = require('html-to-docx');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <h1 style="text-align: center;">CSE 474 Assignment: API Analysis Report</h1>
    <h2 style="text-align: center;">API Analyzed: Resend API</h2>

    <h2>Section 1 – API Discovery & Overview</h2>
    <h3>API Identification</h3>
    <ul>
        <li><strong>Official API name:</strong> Resend API</li>
        <li><strong>Provider/company:</strong> Resend</li>
        <li><strong>Official documentation URL:</strong> https://resend.com/docs/api-reference</li>
    </ul>

    <h3>Primary Purpose</h3>
    <p>The Resend API solves the problem of reliable transactional email delivery for modern applications. In many software systems, including our TRANZO financial platform, developers need to send critical notifications (such as transaction receipts, OTPs, or password resets) without managing the complex underlying infrastructure of SMTP servers, email deliverability, and spam filters.</p>
    <p>Resend provides a developer-friendly REST API for sending emails, managing templates, tracking delivery statuses, and handling domain authentication. It exposes JSON-based endpoints for delivering emails and retrieving analytics data regarding email interactions (bounces, clicks, opens).</p>

    <h3>Base URL</h3>
    <ul>
        <li><strong>Base URL:</strong> https://api.resend.com</li>
        <li><strong>API version:</strong> Resend currently does not use explicit versioning in the URL, but maintains backwards compatibility.</li>
        <li><strong>Explain why versioning is important:</strong> Versioning ensures that when an API provider introduces breaking changes (like renaming fields or altering response structures), existing applications do not suddenly break. Clients can choose when to upgrade to a newer version of the API at their own pace.</li>
    </ul>

    <h3>API Versioning</h3>
    <p>☑ No explicit versioning</p>
    <p>Resend relies on continuous, non-breaking updates rather than explicit version numbers in the URL or headers. There is no documented deprecation policy as they have not yet deprecated their primary endpoints.</p>

    <h2>Section 2 – Endpoint & Functionality Analysis</h2>
    <h3>Endpoint Categories</h3>
    <ul>
        <li>Emails (Sending and retrieving emails)</li>
        <li>Domains (Verifying and managing sender domains)</li>
        <li>API Keys (Creating and revoking keys)</li>
        <li>Audiences/Contacts (Managing mailing lists)</li>
        <li>Webhooks (Managing event subscriptions)</li>
    </ul>

    <h3>Endpoint Inventory</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr>
            <th>#</th>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Required Parameters</th>
            <th>Optional Parameters</th>
            <th>Purpose</th>
            <th>Auth Required</th>
        </tr>
        <tr>
            <td>1</td><td>POST</td><td>/emails</td><td>from, to, subject</td><td>html, text, attachments, bcc, cc</td><td>Send a new email</td><td>Yes</td>
        </tr>
        <tr>
            <td>2</td><td>GET</td><td>/emails/{id}</td><td>id (path)</td><td>None</td><td>Retrieve a specific email's details</td><td>Yes</td>
        </tr>
        <tr>
            <td>3</td><td>POST</td><td>/domains</td><td>name</td><td>region</td><td>Add a new sender domain</td><td>Yes</td>
        </tr>
        <tr>
            <td>4</td><td>GET</td><td>/domains</td><td>None</td><td>None</td><td>List all domains</td><td>Yes</td>
        </tr>
        <tr>
            <td>5</td><td>DELETE</td><td>/domains/{id}</td><td>id (path)</td><td>None</td><td>Remove a domain</td><td>Yes</td>
        </tr>
        <tr>
            <td>6</td><td>POST</td><td>/api-keys</td><td>name</td><td>permission, domain_id</td><td>Generate a new API key</td><td>Yes</td>
        </tr>
        <tr>
            <td>7</td><td>GET</td><td>/api-keys</td><td>None</td><td>None</td><td>List all API keys</td><td>Yes</td>
        </tr>
        <tr>
            <td>8</td><td>DELETE</td><td>/api-keys/{id}</td><td>id (path)</td><td>None</td><td>Revoke an API key</td><td>Yes</td>
        </tr>
    </table>

    <h3>Resource vs Service Design</h3>
    <p><strong>Service-Oriented (for core features) & Resource-Oriented (for configurations).</strong></p>
    <p>While configuring domains and API keys uses standard Resource-Oriented CRUD operations (e.g., <code>GET /domains</code>, <code>DELETE /domains/{id}</code>), the primary core function of the API follows a Service-Oriented approach. For example, <code>POST /emails</code> is conceptually a service action ("Send an email") rather than simply creating a passive database record, as it triggers external network delivery actions.</p>

    <h3>CRUD Mapping (Domains Resource)</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr><th>CRUD</th><th>HTTP Methods</th><th>Example Endpoint</th><th>Available?</th></tr>
        <tr><td>Create</td><td>POST</td><td>/domains</td><td>Yes</td></tr>
        <tr><td>Read</td><td>GET</td><td>/domains/{id}</td><td>Yes</td></tr>
        <tr><td>Update</td><td>PATCH</td><td>/domains/{id}</td><td>Yes</td></tr>
        <tr><td>Delete</td><td>DELETE</td><td>/domains/{id}</td><td>Yes</td></tr>
    </table>

    <h2>Section 3 – Request & Response Data Modeling</h2>
    <h3>Primary Request/Response Object</h3>
    <p><strong>Request JSON (POST /emails):</strong></p>
    <pre>
{
  "from": "Tranzo &lt;onboarding@resend.dev&gt;",
  "to": ["user@example.com"],
  "subject": "Tranzo Receipt - TXN123456",
  "html": "&lt;p&gt;Transaction of 500 BDT successful.&lt;/p&gt;"
}
    </pre>

    <p><strong>Response JSON:</strong></p>
    <pre>
{
  "id": "4b0930ed-0402-40ac-a6f9-03c40212f458"
}
    </pre>

    <h3>Field Analysis</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr><th>Field</th><th>Type</th><th>Required?</th><th>Example</th><th>Description</th></tr>
        <tr><td>from</td><td>String</td><td>Yes</td><td>onboarding@resend.dev</td><td>Sender email address.</td></tr>
        <tr><td>to</td><td>Array (Strings)</td><td>Yes</td><td>["user@example.com"]</td><td>List of recipient email addresses.</td></tr>
        <tr><td>subject</td><td>String</td><td>Yes</td><td>Receipt</td><td>Subject line of the email.</td></tr>
        <tr><td>html</td><td>String</td><td>No</td><td>&lt;p&gt;Hello&lt;/p&gt;</td><td>HTML body of the email.</td></tr>
    </table>

    <h3>Arrays</h3>
    <p>The <code>to</code>, <code>cc</code>, and <code>bcc</code> fields are all Arrays of strings, allowing a single API request to dispatch the email to multiple recipients simultaneously.</p>

    <h3>Request vs Response</h3>
    <p>The Request object is highly detailed, requiring all email metadata and content. The Response object is completely minimal, returning only a single <code>id</code> string. This ID can be used in subsequent requests to check the delivery status.</p>

    <h2>Section 4 – HTTP Methods & Error Handling</h2>
    <p><strong>Supported HTTP Methods:</strong> GET, POST, PATCH, DELETE</p>

    <h3>Success Responses</h3>
    <ul>
        <li><strong>200 OK:</strong> Request succeeded (returned on successful GET, POST, DELETE operations).</li>
    </ul>

    <h3>Client Errors</h3>
    <ul>
        <li><strong>400 Bad Request:</strong> Invalid inputs or missing parameters. Client Action: Correct the payload and retry.</li>
        <li><strong>401 Unauthorized:</strong> Invalid or missing API key. Client Action: Verify environment variables and token validity.</li>
        <li><strong>403 Forbidden:</strong> Trying to send from an unverified domain. Client Action: Complete DNS verification.</li>
        <li><strong>429 Too Many Requests:</strong> Rate limit exceeded. Client Action: Implement exponential backoff retry logic.</li>
    </ul>

    <h3>Sample Error Response</h3>
    <pre>
{
  "statusCode": 403,
  "name": "validation_error",
  "message": "You can only send emails from verified domains."
}
    </pre>

    <h2>Section 5 – Authentication & Security</h2>
    <p><strong>Authentication Mechanism:</strong> Bearer Token</p>
    <p><strong>Credentials:</strong> API Keys are generated in the Resend developer dashboard. Free tier limitations restrict sending emails to verified domains only, or to the developer's registered email address for testing.</p>
    <p><strong>API Keys:</strong> Located in the HTTP <code>Authorization</code> header using the format <code>Bearer re_123456789...</code>. Best practices dictate storing this key securely in environment variables (e.g., <code>.env.local</code>) and never exposing it to the frontend client.</p>

    <h2>Section 6 – Query Parameters & Data Retrieval</h2>
    <p>Since the primary endpoint (<code>POST /emails</code>) uses a JSON body rather than query parameters, query parameters are primarily used in GET endpoints (e.g., listing domains or contacts).</p>
    <p><strong>Path vs Query Parameters:</strong><br>
    Path Parameter: <code>GET /emails/4b0930ed-0402-40ac</code> (identifies a specific, unique resource).<br>
    Query Parameter: <code>GET /emails?limit=10</code> (modifies or filters a list of resources).
    </p>

    <h2>Section 7 – Documentation & Developer Experience</h2>
    <p><strong>Provided:</strong> SDKs (Node.js, Python, Ruby, PHP, Go), OpenAPI Spec.</p>
    <p><strong>Rating:</strong> 9/10. The documentation is incredibly clean, offers copy-paste examples in multiple languages, and clearly defines error codes. It lacks an interactive Swagger UI to test directly from the browser, but provides exceptional official SDK support.</p>

    <h2>Section 8 – AI/API-Specific Analysis</h2>
    <p><strong>Not Applicable.</strong> The Resend API is an email delivery service, not an AI inference model. Concepts like hallucinations, token context limits, and model parameters do not apply to this API.</p>

    <h2>Section 9 – Practical Implementation</h2>
    <h3>Build a Complete Request</h3>
    <ul>
        <li><strong>URL:</strong> https://api.resend.com/emails</li>
        <li><strong>Method:</strong> POST</li>
        <li><strong>Headers:</strong> Authorization: Bearer {API_KEY}, Content-Type: application/json</li>
        <li><strong>Request Body:</strong> <code>{"from": "onboarding@resend.dev", "to": ["test@example.com"], "subject": "Test", "html": "Hello World"}</code></li>
    </ul>
    
    <p><em>Note for Student: Insert your successful and failed screenshots here as requested by the rubric!</em></p>

    <h2>Section 10 – Project Integration Plan</h2>
    <h3>Data Usage</h3>
    <p>The TRANZO project will use this API strictly as an outbound notification service. When a user completes a "Send Money" transaction on the dashboard, the backend will trigger a request to Resend to dispatch an email receipt containing the Transaction ID and Amount.</p>
    
    <h3>Application Flow</h3>
    <pre>
User (Fills out Transfer Form)
↓
Application (Next.js Server Action saves to DB)
↓
API (Next.js POSTs receipt data to Resend API)
↓
Response (Resend returns Email ID)
↓
Display Results (UI shows "Success" Toast)
    </pre>

    <h3>Error Handling & Fallback Strategy</h3>
    <p>If the API is unavailable (e.g., Server failure or Timeouts), the TRANZO app will implement a <strong>Graceful Degradation</strong> strategy. The primary financial transaction will still complete successfully and be saved in the database, but the app will log an internal warning that the email receipt failed to send. The user will be notified of the successful transfer, ensuring core app functionality is never blocked by an email failure.</p>

    <h2>Section 11 – Critical Reflection</h2>
    <ol>
        <li><strong>Would you recommend this API?</strong> Yes, highly. Resend drastically simplifies email delivery compared to legacy providers like SendGrid or AWS SES, offering a modernized developer experience.</li>
        <li><strong>Improvements:</strong> Add interactive Swagger UI for browser testing, offer sandbox environments for isolated testing without consuming quotas, and provide more granular analytics webhooks.</li>
        <li><strong>Challenging aspect:</strong> Understanding the strict domain verification requirements (DKIM/SPF) required before the API can send emails to public domains in production.</li>
        <li><strong>Influence on term project:</strong> Analyzing this API shaped TRANZO's architecture to decouple the core transaction logic from the notification logic, ensuring that if the external email API goes down, users can still securely transfer money.</li>
    </ol>
</body>
</html>
`;

(async () => {
    try {
        const buffer = await HTMLtoDOCX(htmlContent, null, {
            table: { row: { cantSplit: true } },
            footer: true,
            pageNumber: true,
        });
        fs.writeFileSync('/home/warrio/Downloads/API_Analysis_Report.docx', buffer);
        console.log('Document created successfully');
    } catch (error) {
        console.error('Error generating document:', error);
    }
})();
