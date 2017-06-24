package <%=packageName%>.config.ff4j;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.service.UserService;

import org.ff4j.security.AbstractAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Declare an authorization manager based on JHipster security.
 * 
 * @author Clunven (@clunven)
 */
@Service
public class JHipsterAuthorizationManager extends AbstractAuthorizationManager {

	/** Reference to userService. */
	private UserService userService;
	
	/**
	 * Injection through constructor.
	 *
	 * @param us
	 * 		user service.
	 */
	public JHipsterAuthorizationManager(UserService us) {
		this.userService = us;
	}
	
	/** {@inheritDoc} */
	@Override
	public String getCurrentUserName() {
		return SecurityUtils.getCurrentUserLogin();
	}

	/** {@inheritDoc} */
	@Override
	public Set<String> getCurrentUserPermissions() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication   = securityContext.getAuthentication();
        if (authentication != null) {
            return authentication.getAuthorities()
            					 .stream()
            					 .map(GrantedAuthority::getAuthority)
            					 .collect(Collectors.toSet());
        }
		return new HashSet<>();
	}

	/** {@inheritDoc} */
	@Override
	public Set<String> listAllPermissions() {
		<%_ if (databaseType === 'sql' || databaseType === 'mongodb') { _%>
		return new HashSet<>(userService.getAuthorities());<% } %>
		<%_ if (databaseType === 'cassandra') { _%>
		return userService.getUserWithAuthorities().getAuthorities();<% } %>
	}
	
}
