package <%=packageName%>.config;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * This matcher is introduced by FF4j to allow the servlet to perform
 * some POST requests (features creation, update...) without disabling
 * the useful CSRF filter.
 * 
 * @see jhipster-ff4j
 * @author clunven (@clunven)
 */
public class SecurityCsrfRequestMatcher implements RequestMatcher {
	
	/** Standard HTTP METHODS which do not require CSRF. */
	private Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
	
	/** Open requests to ff4j console. */
	private RegexRequestMatcher unprotectedMatcher = new RegexRequestMatcher("/ff4j-web-console/*", null);

	@Override
	public boolean matches(HttpServletRequest request) {
		if (allowedMethods.matcher(request.getMethod()).matches()) {
			return false;
		}
		return !unprotectedMatcher.matches(request);
	}
}