package com.safetynet.app

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.telephony.SmsManager
import android.os.Build

class SmsServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Initialization if needed
    }

    override fun getName(): String {
        return "SmsServiceModule"
    }

    @ReactMethod
    fun sendSms(phoneNumber: String, message: String, promise: Promise) {
        try {
            val permission = Manifest.permission.SEND_SMS
            if (ContextCompat.checkSelfPermission(reactApplicationContext, permission) != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_DENIED", "SEND_SMS permission is not granted")
                return
            }

            val smsManager = SmsManager.getDefault()
            smsManager.sendTextMessage(phoneNumber, null, message, null, null)

            promise.resolve("SMS sent successfully")
        } catch (e: SecurityException) {
            promise.reject("PERMISSION_DENIED", "SEND_SMS permission is not granted", e)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
