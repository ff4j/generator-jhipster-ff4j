package <%=packageName%>.config.ff4j;

import javax.cache.spi.CachingProvider;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.cache.impl.HazelcastServerCachingProvider;
import org.ff4j.hazelcast.CacheManagerHazelCast;

/**
 * Inherit HazelcastInstance to work with same caching cluster.
 *
 * @author clunven (@clunven)
 */
public class JHipsterHazelcastCacheManager extends CacheManagerHazelCast {
	
	/** Instance of HazelCast provided by JHIPSTER. */
	private HazelcastInstance hazelcastInstance; 

    /**
     * Initialization of HazelCast with default config.
     *
     * @param hazelCastConfig
     */
    public JHipsterHazelcastCacheManager(HazelcastInstance hazelcastInstance) {
    	super();
    }
    
    /** {@inheritDoc} */
    @Override
    public CachingProvider initCachingProvider(String className) {
        setCachingProvider(HazelcastServerCachingProvider.createCachingProvider(hazelcastInstance));
        return getCachingProvider();
    }
    
    /** {@inheritDoc} */
    @Override
    public String getCacheProviderName() {
    	return "hazelcast";
    }
}
