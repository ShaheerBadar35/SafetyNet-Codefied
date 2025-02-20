package com.safetynet.app

import android.content.Context
import android.telephony.SmsManager
import android.telephony.SmsManager.getDefault
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager

class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Optionally initialize any resources here
    }

    override fun getName(): String {
        return "SmsModule"
    }

    @ReactMethod
    fun sendSMS(phoneNumber: String, message: String, promise: Promise) {
        // Check if permission is granted before sending SMS
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val context = reactApplicationContext
            if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_DENIED", "SEND_SMS permission is not granted")
                return
            }
        }
        
        try {
            val smsManager = getDefault() // Updated to use 'getDefault()' method
            smsManager.sendTextMessage(phoneNumber, null, message, null, null)
            promise.resolve("Message sent")
        } catch (e: Exception) {
            promise.reject("SMS_SEND_FAILED", e.message)
        }
    }
}
