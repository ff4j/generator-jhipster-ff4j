package <%=packageName%>.config.ff4j;

import org.ehcache.jsr107.EhcacheCachingProvider;
import org.ff4j.cache.FF4jJCacheManager;

/**
 * Inherit HazelcastInstance to work with same caching cluster.
 *
 * @author clunven (@clunven)
 */
public class JHipsterEhCacheCacheManager extends FF4jJCacheManager {
	
    /**
     * Initialization of HazelCast with default config.
     *
     * @param hazelCastConfig
     */
    public JHipsterEhCacheCacheManager() {
    	super(EhcacheCachingProvider.class.getName());
    }
    
    /** {@inheritDoc} */
    @Override
    public String getCacheProviderName() {
    	return "ehcache";
    }
    
}
