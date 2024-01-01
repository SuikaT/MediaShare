package org.suika.mediashare.model.enums;

public enum MediaTypeEnum {
    MOVIE(0),
    SHOW(1),
    ANIME(2);

    int code;

    private MediaTypeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    
}
