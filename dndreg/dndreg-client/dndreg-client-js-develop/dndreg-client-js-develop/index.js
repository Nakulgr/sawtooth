const { EnclaveFactory } = require('./enclave')
const { SawtoothClientFactory } = require('./sawtooth-client')


const env = require('./env')
const input = require('./input')
var readline = require('readline-sync');

const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))
var dndPortal = require('./DNDPortal');

var mobilenumber;
var serviceprovider;
var servicearea;
var preference;
var status;
var activationdate;
var optedservices;

var serviceid=dndPortal.serviceoptions.substr(0,1)
var optedServices=dndPortal.serviceoptions.substr(1)
    switch(serviceid) {
    
     case '0':	 
    	userRegistration()
    	preference="Full (No call and SMS)"
    	status="Active"
    	activationdate=Date()
    	optedservices=serviceid
    	break;
    case '2':
    	userRegistration()
    	preference="Partial"
    	status="Active"
    	activationdate=Date()
    	optedservices=optedServices.split('').join(',');
    	break;
    case '3':
    	entermobilenumber()
    	preference="ViewStatus"
    	status="Active"
    	activationdate=Date()
    	optedservices=serviceid
    	break;
    case '4':
    	entermobilenumber()
    	console.log('Case 4 of index.js')
    	preference="De-register"
    	status="De-Active"
    	activationdate=Date()
    	optedservices=optedServices.split('').join(',');
    	break;
    case 5:
    	console.log('case 5')
    	break;
    default:
		console.log("Invalid option")
		break;
}

const newPayload = {
		 Mobilenumber:mobilenumber,
		 Serviceprovider: serviceprovider,
		 Servicearea: servicearea,
		 Preference:preference,
		 Status:status,
		 Activationdate:activationdate,
		 Optedservices:optedservices
 }


console.log("JSON request "+JSON.stringify(newPayload));

const dndClient = SawtoothClientFactory({
	  enclave: enclave,
	  restApiUrl: env.restApiUrl
	})

	const dndTransactor = dndClient.newTransactor({
	  familyName: env.familyName,
	  familyVersion: env.familyVersion
	})

if (input.payloadIsValid(newPayload)) {
	console.log("Valid payload is getting submitted... "+newPayload)
	input.submitPayload(newPayload, dndTransactor)
} else {
	console.log(`Oops! Your payload failed validation and was not submitted.`)
}

function userRegistration(){

	activationdate = new Date();
	 var existingdate = new Date('2019-05-22');
	mobilenumber = readline.question("Enter the Mobile number: ");
	if(mobilenumber.length < 10 || mobilenumber.length > 10  )
	{
		console.log('Please enter the 10 digit mobile number')
		userRegistration()
	}
	else{
	console.log("Service Providers")
	console.log("======= =========")
    console.log("1. Airtel")
    console.log("2. Jio")
    console.log("3. Bsnl")
    console.log("4. Idea")
    console.log("5. Vadofone")
/*    console.log(activationdate.getFullYear()+'  activaion date ')
    console.log(existingdate.getFullYear()+'  existingdate  ')
    console.log('date '+(activationdate.getFullYear()-existingdate.getFullYear()))
    if((activationdate.getFullYear()-existingdate.getFullYear())==0 && (activationdate.getMonth()-existingdate.getMonth())==0)
	{
    	console.log(' inside  existingdate  ')
	}
	*/
    var option=readline.question("Select your service provider from 1 to 5 \n");
    switch(option){
    case '1':
    	serviceprovider="Airtel";
    	break;
    case '2':
    	serviceprovider="Jio";
    	break;
    case '3':
    	serviceprovider="Bsnl";
    	break;
    case '4':
    	serviceprovider="Idea";
    	break;
    case '5':
    	serviceprovider="Vadofone";
    	break;
    default:
    	console.log("invalid option")
    	break;
    }
    
    servicearea=readline.question("Enter the Service Area: ");
}
}
function entermobilenumber()
{
	mobilenumber = readline.question("Enter the Mobile number: ");
	if(mobilenumber.length < 10 || mobilenumber.length > 10  )
		{
			console.log('Please enter the 10 digit mobile number')
			entermobilenumber()
		}
	
}

/*function dndderegister()
{
	mobilenumber = readline.question("Enter the Mobile number: ");
	if(mobilenumber.length < 10 || mobilenumber.length > 10  )
		{
			console.log('Please enter the 10 digit mobile number')
			dndderegister()
		}
	
}*/


