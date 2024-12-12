package com.rrms.rrms.utils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogUtils {

    public static void init() {
        log.info("Initializing application...");
    }

    public static void info(String serviceCode, Object object) {
        log.info(String.valueOf(new StringBuilder()
                .append("[")
                .append(serviceCode)
                .append("]: ")
                .append(object)));
    }

    public static void info(Object object) {
        log.info((String) object);
    }

    public static void debug(Object object) {
        log.debug((String) object);
    }

    public static void error(Object object) {
        log.error((String) object);
    }

    //    public static void error(Object object) {
    //        logger.error(object);
    //    }

    public static void warn(Object object) {
        log.warn((String) object);
    }
}
