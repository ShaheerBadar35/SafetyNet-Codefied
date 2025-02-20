package com.safetynet.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.util.Log

class YourEmergencyTriggerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent) // Update the intent
        handleIntent(intent)
    }

    private fun handleIntent(intent: Intent?) {
        val data: Uri? = intent?.data
        if (data != null) {
            val keyword = data.getQueryParameter("query")
            if (keyword != null) {
                Log.d("SafetyNet", "Received keyword: $keyword")
                // Here you can pass the keyword to a service or handle it as needed
                startKeywordService(keyword)
            } else {
                Log.d("SafetyNet", "No keyword found in intent")
            }
        } else {
            Log.d("SafetyNet", "No data found in intent")
        }
    }

    private fun startKeywordService(keyword: String) {
        // Start your service to handle the keyword
        val serviceIntent = Intent(this, KeywordService::class.java)
        serviceIntent.putExtra("keyword", keyword)
        startService(serviceIntent)
    }
}
