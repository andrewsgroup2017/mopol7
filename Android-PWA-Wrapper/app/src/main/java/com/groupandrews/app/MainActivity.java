package com.groupandrews.app;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.Manifest;

import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.content.BroadcastReceiver;

import android.content.Intent;
import android.content.IntentFilter;
import android.widget.Toast;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.FirebaseFunctionsException;
import com.google.firebase.functions.HttpsCallableResult;

import java.io.IOException;
import java.util.Map;

import com.groupandrews.app.ui.UIManager;
import com.groupandrews.app.webview.WebViewHelper;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    // Globals

    private final static int LED_GREEN = 1;
    private final static int LED_RED = 2;
    private final static int LED_YELLOW = 3;

    private final static int PERMISSION_LOCATION = 1;
    private final static int PERMISSION_WRITE = 2;
    private final static int RESULT_PREFS_UPDATED = 1;

    private String pref_units;
    private long pref_minTimeMillis;
    private boolean pref_liveSync;

    private final static double KM_MILE = 0.621371;
    private FirebaseFunctions mFunctions;
    private static boolean syncError = false;
    private boolean isUploading = false;

    public String adId = null;

    private DbAccess db;
    private static String TXT_START;
    private static String TXT_STOP;
    private static final int RC_SIGN_IN = 123;
    private String serialNumber;
    final Activity activity = this;
    private static AdvertisingIdClient.Info idInfo;

    private UIManager uiManager;
    private WebViewHelper webViewHelper;
    private boolean intentHandled = false;
    private final String TAG = com.groupandrews.app.MainActivity.class.getSimpleName();
    private int MY_CAMERA_REQUEST_CODE = 123;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ActivityCompat.requestPermissions(activity, new String[] {Manifest.permission.CAMERA}, 123);


        getAdId(this);
        mFunctions = FirebaseFunctions.getInstance();

        db = DbAccess.getInstance();
        db.open(this);
        String trackName = db.getTrackName();
        Log.d(TAG, "[trackName: " + trackName + "]");
        String trackName2 = "tracknameONE";
        db.newTrack(trackName2);
        Log.d(TAG, "[trackName: " + db.getTrackSummary() + "]");
        registerBroadcastReceiver();
        Log.d(TAG, "[loggerunning?: " + LoggerService.isRunning() + "]");
        if (db.getTrackName() != null) {
            Intent intent = new Intent(this, LoggerService.class);
            startService(intent);
        } else {
            // showEmptyTrackNameWarning();
            Log.d(TAG, "[loggerunning?: " + LoggerService.isRunning() + "]");

        }
        addMessage("howdy hoeeee");
        setTheme(R.style.AppTheme_NoActionBar);
        setContentView(R.layout.activity_main);
        uiManager = new UIManager(this);
        webViewHelper = new WebViewHelper(this, uiManager);
        Log.d(TAG, "[adId: " + adId + "]");
        webViewHelper.setupWebView(idInfo);
        uiManager.changeRecentAppsIcon();

        try {
            Intent i = getIntent();
            String intentAction = i.getAction();
            // Handle URLs opened in Browser
            if (!intentHandled && intentAction != null && intentAction.equals(Intent.ACTION_VIEW)) {
                Log.d(TAG, "[service: " + LoggerService.isRunning() + "]");

                Uri intentUri = i.getData();
                String intentText = "";
                if (intentUri != null) {
                    intentText = intentUri.toString();
                }
                // Load up the URL specified in the Intent
                if (!intentText.equals("")) {
                    intentHandled = true;
                    webViewHelper.loadIntentUrl(intentText);
                }
            } else {
                // Load up the Web App
                Log.d(TAG, "[service: " + LoggerService.isRunning() + "]");

                webViewHelper.loadHome();
            }
        } catch (Exception e) {
            // Load up the Web App

            webViewHelper.loadHome();
        }
    }

    private void getAdId (final Context context) {
        AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... params) {

                try {
                    idInfo = AdvertisingIdClient.getAdvertisingIdInfo(context);
                } catch (GooglePlayServicesNotAvailableException e) {
                    e.printStackTrace();
                } catch (GooglePlayServicesRepairableException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                String advertId = null;
                try{
                    advertId = idInfo.getId();
                    Log.d(TAG, "[service: " + advertId + "]");

                }catch (NullPointerException e){
                    e.printStackTrace();
                }

              return advertId;
            }



        };
        task.execute();

    }

//    private void fetchAdvertisingIDExample() {
//        Log.v("OBSDK", "trying to get AdId from Google Play Services");
//        final Activity activity = this;
//
//        GoogleApiAvailability googleAPI = GoogleApiAvailability.getInstance();
//        if (googleAPI.isGooglePlayServicesAvailable(this) == ConnectionResult.SUCCESS) {
//            new Thread(new Runnable() {
//                public void run() {
//                    AdvertisingIdClient.Info adInfo = null;
//
//                    try {
//                        adInfo = AdvertisingIdClient.getAdvertisingIdInfo(activity);
//                    } catch (IOException e) {
//                        Log.e("OBSDK", e.getMessage());
//                    } catch (GooglePlayServicesNotAvailableException e) {
//                        Log.e("OBSDK", e.getMessage());
//                    } catch (GooglePlayServicesRepairableException e) {
//                        Log.e("OBSDK", e.getMessage());
//                    }
//                    adId = adInfo.getId();
//                    boolean userOptOutAdTracking = adInfo.isLimitAdTrackingEnabled();
//
//                    // Respecting user’s “opt out of interest-based advertising” setting
//                    // More details in: https://play.google.com/intl/ALL_us/about/developer-content-policy.html
//                    if (userOptOutAdTracking) {
//                        Log.v("OBSDK", "userOptOutAdTracking --> Removing AdId from Prefs");
//
//                    }
//                    else {
//
//                        Log.v("OBSDK", "Saving AdId: " + adId + " to Prefs");
//                    }
//                }
//            }).start();
//        }
//        else {
//            Log.e("OBSDK", "Error: Google Play Services are not available, error: " + GooglePlayServicesUtil.isGooglePlayServicesAvailable(this));
//        }
//    }

    private Task<String> addMessage(String text) {
        // Create the arguments to the callable function.
        Map<String, Object> data = new HashMap<>();
        data.put("text", text);
        data.put("push", true);

        return mFunctions
                .getHttpsCallable("addMessage")
                .call(data)
                .continueWith(new Continuation<HttpsCallableResult, String>() {
                    @Override
                    public String then(@NonNull Task<HttpsCallableResult> task) throws Exception {
                        // This continuation runs on either success or failure, but if the task
                        // has failed then getResult() will throw an Exception which will be
                        // propagated down.
                        String result = (String) task.getResult().getData();
                        return result;
                    }
                });
    }

    private void onAddMessageClicked() {
        String inputMessage = "woot woot";
        addMessage(inputMessage)
    .addOnCompleteListener(new OnCompleteListener<String>() {
        @Override
        public void onComplete(@NonNull Task<String> task) {
            if (!task.isSuccessful()) {
                Exception e = task.getException();
                if (e instanceof FirebaseFunctionsException) {
                    FirebaseFunctionsException ffe = (FirebaseFunctionsException) e;
                    FirebaseFunctionsException.Code code = ffe.getCode();
                    Object details = ffe.getDetails();
                }

                // [START_EXCLUDE]
                Log.w(TAG, "addMessage:onFailure", e);
//                showSnackbar("An error occurred.");
                return;
                // [END_EXCLUDE]
            }

            // [START_EXCLUDE]
            String result = task.getResult();
//            mMessageOutputField.setText(result);
            // [END_EXCLUDE]
        }
    });
// [END call_add_message]
}

    @Override
    protected void onPause() {
        webViewHelper.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {

        webViewHelper.onResume();

        // retrieve content from cache primarily if not connected
        webViewHelper.forceCacheIfOffline();
        super.onResume();
    }

    // Handle back-press in browser
    @Override
    public void onBackPressed() {
        if (!webViewHelper.goBack()) {
            super.onBackPressed();
        }
    }

    public String getAdId() {
      return adId;
    }

    private void startLogger() {
        // start tracking
        if (db.getTrackName() != null) {
            Intent intent = new Intent(MainActivity.this, LoggerService.class);
            startService(intent);
        } else {
            Log.d(TAG, "[broadcast received shiiit ");

            // showEmptyTrackNameWarning();
        }
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[],
            @NonNull int[] grantResults) {
        if (requestCode == MY_CAMERA_REQUEST_CODE) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Toast.makeText(this, "camera permission granted", Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(this, "camera permission denied", Toast.LENGTH_LONG).show();
            }
        }
        // onPause closed db
        db.open(this);
        switch (requestCode) {
        case PERMISSION_LOCATION:
            if ((grantResults.length > 0) && (grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                // onPause closed db
                db.open(this);
                startLogger();
            }
            break;
        case PERMISSION_WRITE:
            if ((grantResults.length > 0) && (grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                // startExport();
            }
            break;
        }
        db.close();
    }

    private final BroadcastReceiver mBroadcastReceiver=new BroadcastReceiver(){@Override public void onReceive(Context context,Intent intent){Log.d(TAG,"[broadcast received "+intent+"]");if(intent==null||intent.getAction()==null){return;}switch(intent.getAction()){case LoggerService.BROADCAST_LOCATION_UPDATED:

    break;case WebSyncService.BROADCAST_SYNC_DONE:final int unsyncedCount=db.countUnsynced();

    // reset error flag and label

    // showConfirm message if manual uploading
    if(isUploading&&unsyncedCount==0){isUploading=false;}break;case(WebSyncService.BROADCAST_SYNC_FAILED):{

    // set error flag and label
    String message=intent.getStringExtra("message");syncError=true;
    // showConfirm message if manual uploading
    if(isUploading){isUploading=false;}break;}case LoggerService.BROADCAST_LOCATION_STARTED:break;case LoggerService.BROADCAST_LOCATION_STOPPED:break;case LoggerService.BROADCAST_LOCATION_GPS_DISABLED:break;case LoggerService.BROADCAST_LOCATION_NETWORK_DISABLED:break;case LoggerService.BROADCAST_LOCATION_DISABLED:break;case LoggerService.BROADCAST_LOCATION_NETWORK_ENABLED:break;case LoggerService.BROADCAST_LOCATION_GPS_ENABLED:break;

    case LoggerService.BROADCAST_LOCATION_PERMISSION_DENIED:

    ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},PERMISSION_LOCATION);break;

    }}};

    private void registerBroadcastReceiver() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(LoggerService.BROADCAST_LOCATION_STARTED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_STOPPED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_UPDATED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_DISABLED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_GPS_DISABLED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_NETWORK_DISABLED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_GPS_ENABLED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_NETWORK_ENABLED);
        filter.addAction(LoggerService.BROADCAST_LOCATION_PERMISSION_DENIED);
        filter.addAction(WebSyncService.BROADCAST_SYNC_DONE);
        filter.addAction(WebSyncService.BROADCAST_SYNC_FAILED);
        registerReceiver(mBroadcastReceiver, filter);
    }

    /**
     * Broadcast receiver
     */

}
