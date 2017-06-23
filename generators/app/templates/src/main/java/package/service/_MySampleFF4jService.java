package <%=packageName%>.service;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.ff4j.FF4j;
import org.ff4j.conf.XmlConfig;
import org.ff4j.conf.XmlParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * This sample is provided for you to understand how to use the FF4J Framework
 *
 * @author Clunven
 */
@Service
public class MySampleFF4jService {
	
	/** yet another logger. */
	private final Logger log = LoggerFactory.getLogger(MySampleFF4jService.class);
	
	/**
	 * The main class to work with FF4j is well, suprisingly ff4j.
	 * It's a bean and can be injected anywhere.
	 */
	@Autowired
	private FF4j ff4j;
	
	/**
	 * Sample method..
	 */
	public Double getPrice(double amount) {
		double coef = 1;
		if (ff4j.check("ttc")) {
			if (ff4j.getPropertiesStore().existProperty("tvaRate")) {
				coef += (Double) ff4j.getProperty("tvaRate").getValue() / 100;
			}
		}
		return amount * coef;
	}
		
	@PostConstruct
	public void initSampleData() {
		log.warn("Initialize sample data");
		ff4j.createSchema();
		
		try(InputStream xmlFile = getClass().getClassLoader().getResourceAsStream("ff4j.xml")) {
			XmlConfig xmlConf = new XmlParser().parseConfigurationFile(xmlFile);
			ff4j.getFeatureStore().importFeatures(xmlConf.getFeatures().values());
			ff4j.getPropertiesStore().importProperties(xmlConf.getProperties().values());
		} catch (IOException e) {
			log.warn("Cannot initialize DB with sample data", e);
		}
	}

}
