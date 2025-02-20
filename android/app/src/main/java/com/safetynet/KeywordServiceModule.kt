package com.safetynet.app

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class KeywordServiceModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KeywordServiceModule"
    }

    @ReactMethod
    fun startServiceWithKeyword(keyword: String, promise: Promise) {
        try {
            // Create the service intent
            val intent = Intent(reactApplicationContext, KeywordService::class.java)

            // Set the context in the service
            val keywordService = KeywordService()
            keywordService.setReactContext(reactApplicationContext)

            // Pass the keyword
            intent.putExtra("keyword", keyword)

            // Start the service
            reactApplicationContext.startService(intent)

            promise.resolve("Service started successfully")
        } catch (e: Exception) {
            promise.reject("Error", "Failed to start service", e)
        }
    }
}
