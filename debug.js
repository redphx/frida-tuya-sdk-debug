setImmediate(function() {
    Java.perform(function() {
        // Enable global logging
        var utils = Java.use('com.tuya.smart.android.common.utils.L');
        utils.isLogOn.value = true;
        console.log('Set isLogOn: ' + utils.isLogOn.value);

        // Enable Bluetooth logging
        var bluetoothLog = Java.use('com.tuya.sdk.blelib.utils.BluetoothLog');
        bluetoothLog.accessLevel.value = 4;
        console.log('Set BluetoothLog level: ' + bluetoothLog.accessLevel.value);

    })

    // https://codeshare.frida.re/@masbog/frida-android-unpinning-ssl/
    Java.perform(function() {
        console.log("");
        console.log("[.] Android Cert Pinning Bypass");

        //-------
        console.log("[.] OkHTTP 3.x detection...");
        // OkHTTP v3.x
        // Wrap the logic in a try/catch as not all applications will have
        // okhttp as part of the app.
        try {
            var CertificatePinner = Java.use('okhttp3.CertificatePinner');
            console.log("[+] OkHTTP 3.x Found");
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function() {
                console.log("[+] OkHTTP 3.x check() called. Not throwing an exception.");
            };
        } catch (err) {
            // If we dont have a ClassNotFoundException exception, raise the
            // problem encountered.
            console.log("[-] OkHTTP 3.x Not Found")
        }
    })
})
