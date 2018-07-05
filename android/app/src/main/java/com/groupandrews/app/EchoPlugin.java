package com.groupandrews.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class EchoPlugin extends Plugin {

    @PluginMethod()
    public void echo(PluginCall call) {
//        String value = call.getString("value");
        JSObject ret = new JSObject();
        ret.put("added", true);
        JSObject info = new JSObject();
        info.put("id", "unique-id-1234");
        ret.put("info", info);
        call.resolve(ret);
    }
}