package org.suika.mediashare.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MediaTypeEnum {
    MOVIE(0, false), SHOW(1, true), ANIME(2, true);

    int code;
    // media possibly have season or not
    boolean seasons;

    private MediaTypeEnum(int code, boolean seasons) {
        this.code = code;
        this.seasons = seasons;
    }

    public static MediaTypeEnum getEnum(Integer code) {
        for (MediaTypeEnum mediaType : values()) {
            if (mediaType.getCode() == code)
                return mediaType;
        }

        return null;
    }

    @JsonValue
    public int getCode() {
        return code;
    }

    public boolean isSeasons() {
        return seasons;
    }
}
