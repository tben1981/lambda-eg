// This is the lambda function to take a HTML form to send data by email from a static webpage 
// The static webpage is a HTML file that had a script to call lamda fynction

const aws = require("aws-sdk");
const ses = new aws.SES({ region: "ap-southeast-1" });
#Base on the site your SES is verfiied

const headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};


exports.handler = async function (event) {
  console.log('EVENT: ', event)
  // Extract the properties from the event body
   const { name, phone, email, remark } = JSON.parse(event.body)
   // note: HTML must contain the same ID in th eform as const for link
   
   let statusCode = 200, body = '';
   
             //Data: `Hello from Lambda! , there is nothing new under the sun` 
  let params = {
    Destination: {
      ToAddresses: ["benjamin.tan@web3re.co"],
    },
    Message: {
      Body: {
        Text: { 
              Data: `We recieved an enquiry from  ${name} 
              Email: ${email} 
              Phone: ${phone} 
              Remark: ${remark}`
               
        },
      },
      Subject: { Data: `New Enquiry from ${name} using Europa Capital website` },
    },
    Source: "benjamin.tan@web3re.co",
  };
  
  try {
		await ses.sendEmail(params).promise();
	} catch (err) {
		console.error(err);
		statusCode = 400;
		body = err.toString();
	}

	return {statusCode, headers, body};
};
