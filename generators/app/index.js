// --------------------------------------------------------------------------------------------
// --- FF4j : Feature Flipping for Java
// --------------------------------------------------------------------------------------------
const chalk     	= require('chalk');
const generator 	= require('yeoman-generator');
const packagejs 	= require('../../package.json');

// Stores JHipster variables
const jhipsterVar 	= { moduleName: 'ff4j' };

// Stores JHipster functions
const jhipsterFunc 	= {};

// Stores JHipster functions
const jhipsterUtils = {};

// Constants
const TPL 					= 'template';
const FF4J_VERSION  		= '1.6.5';

// Functions available
module.exports = generator.extend( {

	// ----------------------------------------------------
    // Use compose Yeoman capability to maje jhipterVar available (like DB)
    // ----------------------------------------------------
    initializing: {
    	compose() {
            this.composeWith('jhipster:modules',   { 
            	jhipsterVar, 
            	jhipsterFunc,
            	jhipsterUtils},
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/modules') } : null
            );
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster ff4j')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        }
    },
    
    // ----------------------------------------------------
    // Ask questions to user to set up the generator
    // ----------------------------------------------------
    prompting() {
        const done = this.async();
        const prompts = [
        	{    type: 'confirm',
                 name: 'ff4jInstall',
                 message: 'Do you want to install FF4j ?',
                 default: false   },
            {
                type: 'list',
                name: 'ff4jFeatureStore',
                message: 'Which database would you like to use to store *Features* ?',
                choices: [
                  {name: 'Reuse current (' + jhipsterVar.databaseType+ ')', value: jhipsterVar.databaseType},
                  {name: 'SQL', 			value: 'sql'},
                  {name: 'Cassandra', 		value: 'cassandra'},
                  {name: 'MongoDB', 		value: 'mongodb'},                
                  {name: 'ElasticSearch', 	value: 'elastic'},
                  {name: 'Redis', 			value: 'redis'},
                  {name: 'Consul', 			value: 'consul'},
                ],
               default: jhipsterVar.databaseType },
             {
                type: 'list',
                name: 'ff4jPropertyStore',
                message: 'Which database would you like to use to store *Properties* ?',
                choices: [
                  {name: 'Reuse current (' + jhipsterVar.databaseType+ ')', value: jhipsterVar.databaseType},
                  {name: 'SQL', 			value: 'sql'},
                  {name: 'Cassandra', 		value: 'cassandra'},
                  {name: 'MongoDB', 		value: 'mongodb'},                
                  {name: 'ElasticSearch', 	value: 'elastic'},
                  {name: 'Redis', 			value: 'redis'},
                  {name: 'Consul', 			value: 'consul'},
                  ],
                  default: jhipsterVar.databaseType },
              {
              	type: 'list',
                name: 'ff4jEventRepository',
                message: 'Which database would you like to use to store *AuditTrail* ?',
                choices: [
                  {name: 'Reuse current (' + jhipsterVar.databaseType+ ')', value: jhipsterVar.databaseType},
                  {name: 'SQL', 			value: 'sql'},
                  {name: 'Cassandra', 		value: 'cassandra'},
                  {name: 'MongoDB', 		value: 'mongodb'},                
                  {name: 'ElasticSearch', 	value: 'elastic'},
                  {name: 'Redis', 			value: 'redis'},
                ],
                default: jhipsterVar.databaseType },
                {
                  	type: 'list',
                    name: 'ff4jCache',
                    message: 'Do you want to enable Caching ?',
                    choices: [
                      {name: 'No.', value: 'no'},
                      {name: 'Reuse current (' + jhipsterVar.hibernateCache + ')', value: jhipsterVar.hibernateCache},
                      {name: 'Yes with EhCache', 		value: 'ehcache'},
                      {name: 'Yes with Terracotta', 	value: 'terracotta'},
                      {name: 'Yes with Ignite', 		value: 'ignite'},                
                      {name: 'Yes with HazelCast', 		value: 'hazelcast'},
                      {name: 'Yes with Redis', 		  	value: 'redis'}
                ],
                default: 'no' },
                {   
                	type: 'confirm',
                    name: 'ff4jSample',
                    message: 'Do you want to install the sample illustrating ff4j?',
                    default: true   
                }
              
        ];
        
        // After prompting, put variables in the context
        this.prompt(prompts).then((props) => {
            this.props = props;
            done();
        });
    },
    
    // -----------------------------------------
    // Copy Files to be used
    // -----------------------------------------
    writing() {
    	
    	// Abort if requested
    	this.ff4jInstall = this.props.ff4jInstall;
    	if (!this.ff4jInstall) {
        	this.log(`\n${chalk.bold.green('[jhipster-ff4j]')} - Aborted`);
            return;
        }   
        
    	this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };
        
        this.copyFiles = function (files) {
            files.forEach( function(file) {
              jhipsterFunc.copyTemplate(file.from, file.to, 
            		  file.type? file.type: TPL, this, file.interpolate? { 'interpolate': file.interpolate } : undefined);
            }, this);
        };
        
        this.isDbRequired = function(dbName) {
        	return  this.ff4jFeatureStore    === dbName ||  
        			this.ff4jEventRepository === dbName || 
        			this.ff4jPropertyStore   === dbName ||
        			this.ff4jCache			 === dbName;
        };
        
        // Extract core information
        this.baseName 				= jhipsterVar.baseName;
        this.packageName 			= jhipsterVar.packageName;
        this.angularAppName 		= jhipsterVar.angularAppName;
        
        // Core config
        this.clientFramework 		= jhipsterVar.clientFramework;
        this.clientPackageManager 	= jhipsterVar.clientPackageManager;
        this.enableTranslation		= jhipsterVar.enableTranslation;
        
        // DataBase (used to setup ff4j as well)
        this.databaseType			= jhipsterVar.databaseType;
        this.devDatabaseType		= jhipsterVar.devDatabaseType;
        this.prodDatabaseType		= jhipsterVar.prodDatabaseType;
        
        // Path Config
        const javaDir 				= jhipsterVar.javaDir;
        const resourceDir 			= jhipsterVar.resourceDir;
        const webappDir 			= jhipsterVar.webappDir;
        this.javaDir 				= jhipsterVar.javaDir;
        this.resourceDir			= jhipsterVar.resourceDir;
        this.javaTemplateDir 		= 'src/main/java/package';
        this.message 				= this.props.message;
        
        // Custom Parameters
        this.ff4jFeatureStore	 = this.props.ff4jFeatureStore;
        this.ff4jEventRepository = this.props.ff4jEventRepository;
        this.ff4jPropertyStore	 = this.props.ff4jPropertyStore;
        this.ff4jCache			 = this.props.ff4jCache;
        this.ff4jSample		     = this.props.ff4jSample;
       
        this.log(`\n${chalk.bold.green('[jhipster-ff4j]')} - Starting...`);
        
        // Update Dependencies
        if (jhipsterVar.buildTool === 'maven') {            
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-core', 			     FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-core] (maven)`);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-web', 				 FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-web] (maven)`);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-spring-services', 	 FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-spring-services] (maven)`);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-spring-boot-web-api',  FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-spring-boot-web-api] (maven)`);
            
            if (this.isDbRequired('sql')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-springjdbc', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-springjdbc] (maven)`);
            	// As not provided by Jhispter, need to declare a driver and a datasource
            	if (this.databaseType != 'sql') {
            		jhipsterFunc.addMavenDependency('com.h2database', 'h2', '1.4.195');
            		jhipsterFunc.addMavenDependency('com.zaxxer', 'HikariCP', '2.6.0');
            	}
            }
            if (this.isDbRequired('cassandra')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-cassandra', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-cassandra] (maven)`);
            }
            if (this.isDbRequired('mongodb')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-mongodb-v3', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-mongodb-v3] (maven)`);
            }
            if (this.isDbRequired('elastic')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-elastic', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-elastic] (maven)`);
            }
            if (this.isDbRequired('hbase')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-hbase', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-hbase] (maven)`);
            }
            if (this.isDbRequired('neo4j')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-neo4j', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-neo4j] (maven)`);
            }
            if (this.isDbRequired('redis')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-redis', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-redis] (maven)`);
            }
            if (this.isDbRequired('ehcache') || this.isDbRequired('terracotta')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-ehcache', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-ehcache] (maven)`);
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (maven)`);
            }
            if (this.isDbRequired('ignite')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-ignite', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-ignite] (maven)`);
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (maven)`);
            }
            if (this.isDbRequired('hazelcast')) {
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-hazelcast', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-hazelcast] (maven)`);
            	jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (maven)`);
            }
            
        } else if (jhipsterVar.buildTool === 'gradle') {
        	
        	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-core', 			     FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-core] (gradle)`);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-web', 				 FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-web] (gradle)`);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-spring-services', 	 FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-spring-services] (gradle)`);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-spring-boot-web-api',  FF4J_VERSION);
            this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-spring-boot-web-api] (gradle)`);            
            if (this.isDbRequired('sql')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-springjdbc', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-springjdbc] (gradle)`);
            	// As not provided by Jhispter, need to declare a driver and a datasource
            	if (this.databaseType != 'sql') {
            		jhipsterFunc.addGradleDependency('com.h2database', 'h2', '1.4.195');
            		jhipsterFunc.addGradleDependency('com.zaxxer', 'HikariCP', '2.6.0');
            	}
            }
            if (this.isDbRequired('cassandra')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-cassandra', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-cassandra] (gradle)`);
            }
            if (this.isDbRequired('mongodb')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-mongodb-v3', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-mongodb-v3] (gradle)`);
            }
            if (this.isDbRequired('elastic')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-elastic', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-elastic] (gradle)`);
            }
            if (this.isDbRequired('hbase')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-hbase', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-hbase] (gradle)`);
            }
            if (this.isDbRequired('neo4j')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-neo4j', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-neo4j] (gradle)`);
            }
            if (this.isDbRequired('redis')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-redis', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-redis] (gradle)`);
            }
            if (this.isDbRequired('ehcache') || this.isDbRequired('terracotta')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-ehcache', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-ehcache] (gradle)`);
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (gradle)`);
            }
            if (this.isDbRequired('ignite')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-ignite', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-ignite] (gradle)`);
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (gradle)`);
            }
            if (this.isDbRequired('hazelcast')) {
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-hazelcast', FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-hazelcast] (gradle)`);
            	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-store-jcache',  FF4J_VERSION);
            	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Add dependency [ff4j-store-jcache] (gradle)`);
            }
        }
        
        // Copy Files (Java)
        files = [
            { from: this.javaTemplateDir + '/config/_FF4jConfiguration.java',  
            	to: this.javaDir + 'config/FF4jConfiguration.java'},
            { from: this.javaTemplateDir + '/config/ff4j/_JHipsterAuthorizationManager.java',  
            	to: this.javaDir + 'config/ff4j/JHipsterAuthorizationManager.java'},
            { from: this.javaTemplateDir + '/config/ff4j/_JHipsterEventRepository.java',  
            	to: this.javaDir + 'config/ff4j/JHipsterEventRepository.java'},
            { from: this.javaTemplateDir + '/config/_SecurityCsrfRequestMatcher.java', 
            	to: this.javaDir + 'config/SecurityCsrfRequestMatcher.java'},
           
            { from: 'src/main/resources/config/liquibase/changelog/_ff4jTables.xml',
                    to: this.resourceDir + 'config/liquibase/changelog/00000000000001_added_ff4jTables.xml', 
                    interpolate: this.interpolateRegex }            	
          ];
        this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Import Java files`);
        this.copyFiles(files);
        
        // Liquibase (add Tables in the DB)
        jhipsterFunc.addChangelogToLiquibase('00000000000001_added_ff4jTables');
        this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Import Liquibase changelog files`);
        
        // Add link in WebPack
        this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Update Webpack Configuration`);
        jhipsterFunc.rewriteFile('webpack/webpack.dev.js', 'jhipster-needle-add-entity-to-webpack', "'/ff4j-web-console',");
        
        // Add Reference the Admin menu
        this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Update Admin Menu`);
    	if (this.clientFramework === 'angular1') {
        	jhipsterFunc.rewriteFile(
            		'src/main/webapp/app/layouts/navbar/navbar.html',
            		'jhipster-needle-add-element-to-admin-menu',
            		
            		'<li ui-sref-active="active">\n'+
            		' <a ui-sref="./ff4j-web-console/home?lang=en" ng-click="vm.collapseNavbar()">\n' +
            		'<span class="glyphicon glyphicon-toggle-on"></span>&nbsp;\n '+
            		'<span>Feature Toggle</span>\n'+
            		'</a> </li>\n');
        } else {
        	jhipsterFunc.rewriteFile(
             		'src/main/webapp/app/layouts/navbar/navbar.component.html',
             		'jhipster-needle-add-element-to-admin-menu',
             		
             		'<li> <a class="dropdown-item" href="./ff4j-web-console/home?lang=en" target="_tab" (click)="collapseNavbar()">\n'+
                    '  <i class="fa fa-fw fa-toggle-on" aria-hidden="true"></i>&nbsp;\n' +
                    '  <span>Feature Toggle</span>\n' +
                    ' </a>\n</li>');
        }
    	
    	// Update CSRF to allow request
    	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Update security configuration (csrf, url)`);
    	jhipsterFunc.replaceContent(this.javaDir + 'config/SecurityConfiguration.java', 
    			'.csrf()', 
    			'.csrf().requireCsrfProtectionMatcher(new SecurityCsrfRequestMatcher())');
    	// Secured access to the servlet
    	jhipsterFunc.replaceContent(this.javaDir + 'config/SecurityConfiguration.java', 
    			' .authorizeRequests()', 
    			' .authorizeRequests()\n.antMatchers("/ff4j-web-console/**").hasAuthority('+  this.packageName + '.security.AuthoritiesConstants.ADMIN)');
        
    	// Update application.yml based on configuration of FF4J
    	let ff4jConfig = '\n# ===================================================================\n';
    	ff4jConfig+='# FF4j specific properties\n';
    	ff4jConfig+='# ===================================================================\n';
    	ff4jConfig+='ff4j:\n';
    	ff4jConfig+='   core:\n';
    	ff4jConfig+='      autocreate: true\n';
    	ff4jConfig+='   audit:\n';
    	ff4jConfig+='      enabled: true\n';
    	ff4jConfig+='      log2jhispter: true\n';
    	// Add default settings in Properties if the DB is not the same as current APP
    	if (this.isDbRequired('elastic')) {
    		ff4jConfig+='   elastic:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 9200\n';
    	}
    	if (this.isDbRequired('hbase')) {
    		ff4jConfig+='   hbase:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 2181\n';
    	}
    	if (this.isDbRequired('neo4j')) {
    		ff4jConfig+='   hbase:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 7474\n';
    	}
    	if (this.isDbRequired('redis')) {
    		ff4jConfig+='   redis:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 6379\n';
    	}
    	if (this.isDbRequired('consul')) {
    		ff4jConfig+='   consul:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 8500\n';
    	}
    	// Expect to find a Cluster, if not use this default info
    	if (this.isDbRequired('cassandra') && this.databaseType != 'cassandra') {
    		ff4jConfig+='   cassandra:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 9042\n';
    	}
    	// Expect to find a MongoClient, if not use this default info
    	if (this.isDbRequired('mongodb') && this.databaseType != 'mongodb') {
    		ff4jConfig+='   mongodb:\n';
        	ff4jConfig+='      hostname: localhost\n';
        	ff4jConfig+='      port: 27017\n';
    	}
    	if (this.isDbRequired('sql') && this.databaseType != 'sql') {
    		ff4jConfig+='   sql:\n';
        	ff4jConfig+='      dataSourceClassName: com.zaxxer.hikari.HikariDataSource\n';
        	ff4jConfig+='      dataSourceUrl: jdbc:h2:file:./target/h2db/db/ff4j;DB_CLOSE_DELAY=-1\n';
        	ff4jConfig+='      username: ff4j\n';
        	ff4jConfig+='      password: ff4j\n';
    	}
    	
    	jhipsterFunc.rewriteFile('src/main/resources/config/application.yml', 'application:', ff4jConfig);
    	
    	// Install the FF4J sample to illustrate working with FF4J
    	if (this.ff4jSample) {
        	this.log(`${chalk.bold.green('[jhipster-ff4j]')} - Install MySampleFF4j (will populate db at startup)`);
        	files = [
                 { from: this.javaTemplateDir + '/service/_MySampleFF4jService.java',  
                 	to: this.javaDir + 'service/MySampleFF4jService.java'},
                 	
                 { from: this.javaTemplateDir + '/web/rest/_MySampleFF4jResource.java',  
                 	to: this.javaDir + 'web/rest/MySampleFF4jResource.java'},
                 	
                 { from: 'src/main/resources/ff4j.xml', to: this.resourceDir + 'ff4j.xml'},
               ];
             this.copyFiles(files);
    	}
    },
    
    install() {
    	this.log(`install()`);
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.installDependencies(installConfig);
    },

    end() {
    	if (this.ff4jInstall) {
    		this.log('End of ff4j generator');
    	}
    }
});


