package <%=packageName%>.config.ff4j;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.ff4j.audit.Event;
import org.ff4j.audit.EventConstants;
import org.ff4j.audit.EventQueryDefinition;
import org.ff4j.audit.EventSeries;
import org.ff4j.audit.MutableHitCount;
import org.ff4j.audit.chart.TimeSeriesChart;
import org.ff4j.audit.repository.AbstractEventRepository;
import org.ff4j.audit.repository.EventRepository;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.AuditEventRepository;

import <%=packageName%>.security.SecurityUtils;

/**
 * Log FF4j operations into Jhipster auditing mechanism.
 *
 * @author clunven (@clunven)
 */
public class JHipsterEventRepository extends AbstractEventRepository {

	/** Leveragin on current repository. */
	private final EventRepository eventRepository;
	
	/** User services of Jhispter to be used in FF4j. */
	private final AuditEventRepository auditRepository;
	
	/**
	 * Default constructor.
	 *
	 * @param ev
	 * 		current envent repository
	 * @param audi
	 * 		current audit service
	 */
	public JHipsterEventRepository(EventRepository ev, AuditEventRepository audi) {
		this.eventRepository = ev;
		this.auditRepository = audi;
	}
	
	/**
	 * Extract information in ff4j audit object to JHispter.
	 *
	 * @param e
	 * 		target event
	 * @return
	 * 		audit event
	 */
	public static AuditEvent mapEvent2AuditEvent(Event e) {
		String principal = e.getUser() != null ? e.getUser() : SecurityUtils.getCurrentUserLogin();
		String type 	 = e.getAction().toUpperCase() + " " + e.getType().toUpperCase() + " " + e.getName();
		Map < String, Object> extraKeys = new HashMap<>();
		extraKeys.put(EventConstants.ATTRIBUTE_HOST, e.getHostName());
		extraKeys.put(EventConstants.ATTRIBUTE_ID,   e.getUuid());
		extraKeys.put(EventConstants.ATTRIBUTE_NAME, e.getName());
		extraKeys.put(EventConstants.ATTRIBUTE_DURATION, e.getDuration());
		extraKeys.put(EventConstants.ATTRIBUTE_SOURCE, e.getSource());
		extraKeys.put(EventConstants.ATTRIBUTE_TIME, e.getTimestamp());
		extraKeys.putAll(e.getCustomKeys());
		return new AuditEvent(principal, type, extraKeys);
	}
	
	/** {@inheritDoc} */
	@Override
	public boolean saveEvent(Event e) {
		auditRepository.add(mapEvent2AuditEvent(e));
		return eventRepository.saveEvent(e);
	}
	
	/** {@inheritDoc} */
	@Override
	public Event getEventByUUID(String uuid, Long timestamp) {
		return eventRepository.getEventByUUID(uuid, timestamp);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, MutableHitCount> getFeatureUsageHitCount(EventQueryDefinition query) {
		return eventRepository.getFeatureUsageHitCount(query);
	}

	/** {@inheritDoc} */
	@Override
	public TimeSeriesChart getFeatureUsageHistory(EventQueryDefinition query, TimeUnit tu) {
		return eventRepository.getFeatureUsageHistory(query, tu);
	}

	/** {@inheritDoc} */
	@Override
	public EventSeries searchFeatureUsageEvents(EventQueryDefinition query) {
		return eventRepository.searchFeatureUsageEvents(query);
	}

	/** {@inheritDoc} */
	@Override
	public void purgeFeatureUsage(EventQueryDefinition query) {
		eventRepository.purgeFeatureUsage(query);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, MutableHitCount> getHostHitCount(EventQueryDefinition query) {
		return eventRepository.getHostHitCount(query);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, MutableHitCount> getUserHitCount(EventQueryDefinition query) {
		return eventRepository.getUserHitCount(query);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, MutableHitCount> getSourceHitCount(EventQueryDefinition query) {
		return eventRepository.getSourceHitCount(query);
	}

	/** {@inheritDoc} */
	@Override
	public EventSeries getAuditTrail(EventQueryDefinition query) {
		return eventRepository.getAuditTrail(query);
	}

	/** {@inheritDoc} */
	@Override
	public void purgeAuditTrail(EventQueryDefinition query) {
		eventRepository.getAuditTrail(query);
	}

	/** {@inheritDoc} */
	@Override
	public void createSchema() {
		eventRepository.createSchema();
	}

}