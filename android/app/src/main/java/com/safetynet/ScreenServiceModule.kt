package com.safetynet.app

import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenServiceModule"
    }

    @ReactMethod
    fun startScreenService() {
        val intent = Intent(reactApplicationContext, ScreenService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactApplicationContext.startForegroundService(intent)
        } else {
            reactApplicationContext.startService(intent)
        }
    }

    @ReactMethod
    fun stopScreenService() {
        val intent = Intent(reactApplicationContext, ScreenService::class.java)
        reactApplicationContext.stopService(intent)
    }
}
