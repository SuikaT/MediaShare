package org.suika.mediashare.model.classes;

import java.io.InputStream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MediaFile {

	String fileName;

	InputStream file;
}
