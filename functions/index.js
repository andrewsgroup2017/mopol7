const key = {
    "type": "service_account",
    "project_id": "opol7dev",
    "private_key_id": "8f229e43955a89993af820d9c85445d9c876799d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDX77WcUAUw2CQG\nIKTO5F2xXTmAQtZzNEdb2no9hR4oxkZLOuvnFuulFb7DFArx7LeGibcrANlPQGnY\n2oqFDq7aSXscOFEgNdjSlVd994x8GAXzRw8TzQR+KoJFfTQuRttB50jMOFltPjix\nQdlAkqM72E32QfHOhVoMcja+aQpPogpXZeJE6/0O1FwCfdXKt3xQTsrPoH1XNUDV\nKkpmOrovezf/nU936EPkwmEoAQsKf2g1CJrwaNvzenfOpQ/UaG5CfFx9hjZqU0no\nDZsqstUPimrp8C2mJNDYG/LM+rS1rJ78xE41Zsqddvd26of7hltkPdo0qXyXk3sC\nkIN+kg/FAgMBAAECggEAZUBnPfZfmLmgmqbv4HtAW4xFDBlLCRX4Z9+X9gTXUXM3\nPstQFjmvIOeDXWGmiC3hGFq24pkxTHH9r8s5rI5n+r791QurLplRI90W+1/6Ja32\nDE7DiRtXAfnYv9CniRN8d/iFMA00EX9dgfBIeHjJxaP1WoUtZxMsWC2t8ba7OP77\nobNrULXg1MY+rmvRzQ3M/Tl1Qc1pPZA2CPcYS9muGZB90w3PJSxCG6KKlgKW8Soo\nhBg7Rdl8oVtxEi5S2nvEGyWUjNWVf/igk560QJ115eRzJB+/o9ERcG4tfKDNy7TU\nXN+shucop5APKmH7q9172oeglEr8NxSsgSgB81FmOQKBgQDwfE4sX1k9Wjh0cbkI\nD7MX/vUFI4Om3/oNqn+YVY68xalzIXWI0jciUdQjDGs53B1grdUiITa/HsQtI/9f\neAU03GDkQ8FqI2FAcaN5iu4g8yZiqQ1hVO0eY+tM84uO4x4bjLJiIkiFcvb5EZ+U\nDCP1llBCFj8DerUiKuc4u8nnpwKBgQDl3fdc0x6KXg/BNK2K7adr+TE7OTpRyL4c\nUHYzv5TuX+Jm6ziJF6joD2sETiix1+sncu9Mo8UtayER6+oTHzxU+3YXuGSgYOLN\n1HTlRB4FLFltVRryzu/6BKEpcyX8FPJQTpBejJ1ZYwJLlWJciR/r8ad1MpAfjtt8\nGVoxH/T6swKBgDXB88+jeNVoJ5qQGWad69D/Y1JEwBc7ljAb3u30ojW8kcZ0wktV\ngpGfbSZwjj+e3spP0YcRmaVbgUr98wYqVC+e2+Hq63+IbSL0xDBVSCoBcKE5XQ5W\n57KVb3ICNz43svFBoFajh0adjmva7qsvk5JAiaxcQLXMZlU+9fUOtXGdAoGBALqN\nvmezX6HkXNzsp7uMzMewYegytcYSKVhJZOTyoygi4VetpyB79zT+7ld8J0LOfaZy\nfQuyDiCiRSCKWlpSi2BdBKaTm/cdKnTp7ET1V3fTWnCFFW3hzJkYkMNXFIjVZyMN\n39UcQcd9tysofb+j+ig+4y0WcClsg2zgFnav/N5JAoGBALO680raldOE81hNXuBB\n1GWrc8mU+00C3RrEMteCuZGkOHAU+MFKlZc7ds8dkO1KrgzrlAFXZJRgx0tudd0K\n3M+WHTL2Y/s62iXRtTc5hMU3anrT09mK+mBc5lBWQBOAZwkZm+zopLaLG5tgguxc\nZ1K4RIjBWOAIJejjsmh5YzE+\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-d6b0s@opol7dev.iam.gserviceaccount.com",
    "client_id": "117369191225834586694",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d6b0s%40opol7dev.iam.gserviceaccount.com"
  }
// const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stats = require('./lib/stats')
const stats_hardware = require('./lib/stats_hardware')
const employees = require('./lib/employees')
// const algolia = require('./lib/algolia')
// admin.initializeApp(key)

exports.countCreateProduct = stats.countCreateProduct
exports.countDeleteProduct = stats.countDeleteProduct
exports.countCreateHardware = stats_hardware.countCreateHardware
exports.countDeleteHardware = stats_hardware.countDeleteHardware
exports.employeeLoginEvent = employees.employeeLoginEvent
exports.auth = employees.auth

