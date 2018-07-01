/*
 * Copyright (c) 2017 Bartek Fabiszewski
 * http://www.fabiszewski.net
 *
 * This file is part of μlogger-android.
 * Licensed under GPL, either version 3, or any later.
 * See <http://www.gnu.org/licenses/>
 */

package com.groupandrews.app;

/**
 * Web authentication exception
 *
 */

class WebAuthException extends Exception {

    public WebAuthException(String message) {
        super(message);
    }
}
