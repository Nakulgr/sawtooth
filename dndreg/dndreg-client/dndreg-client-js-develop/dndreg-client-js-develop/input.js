const input = {
  payloadIsValid: (payload) => {
	  console.log('payload :: ', payload)


/*    if (actionIsValid(payload.Action) && mobilenumberIsValid(payload.Mobilenumber)) return true

    else return false */
    return true;
  },
  submitPayload: async (payload, transactor) => {
    try {
      // Format the Sawtooth transaction
      const txn = payload
      console.log(`Submitting transaction to Sawtooth REST API`)
      // Wait for the response from the validator receiving the transaction
      const txnRes = await transactor.post(txn)
      // Log only a few key items from the response, because it's a lot of info
      console.log({
        status: txnRes.status,
        statusText: txnRes.statusText
      })
      return txnRes
    } catch (err) {
      console.log('Error submitting transaction to Sawtooth REST API: ', err)
      console.log('Transaction: ', txn)
    }
  }
}

/* const isInteger = (value) => {
  if (isNaN(value)) {
    return false
  }
  var x = parseFloat(value)
  return (x | 0) === x
} */

//const actionIsValid = (action) => {
//  const trimmed = action.trim()
//  if (trimmed === 'dndregistration' || trimmed === 'dndsearch') return true
//  else return false
//}
//
//const mobilenumberIsValid = (Mobilenumber) => {
//  if (Mobilenumber.toString().length == 11) return true
//  else return false
//}

/* const valueIsValid = (value) => {
  if ((isInteger(value)) && (value >= 0) && (value < Math.pow(2, 32) - 1)) return true
  else return false
} */

module.exports = input
