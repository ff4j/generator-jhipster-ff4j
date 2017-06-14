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

// Constants
const TPL 			= 'template';
const FF4J_VERSION  = '1.6.4';

// Functions available
module.exports = generator.extend( {

	// ----------------------------------------------------
    // Use compose Yeoman capability to maje jhipterVar available (like DB)
    // ----------------------------------------------------
    initializing: {
    	compose() {
            this.composeWith('jhipster:modules',   { jhipsterVar, jhipsterFunc },
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
                  {name: 'Same as Application', value: 'same'},
                  {name: 'Cassandra', value: 'cassandra'},
                  {name: 'ElasticSearch', value: 'elastic'},
                  {name: 'HazelCast', value: 'hazelCast'},
                  {name: 'HBase', value: 'hbase'},
                  {name: 'Ignite', value: 'ignite'},
                  {name: 'MongoDB', value: 'mongo'},
                  {name: 'Neo4j', value: 'neo4j'},
                  {name: 'Redis', value: 'neo4j'},
                  {name: 'SQL', value: 'sql'},
                  {name: 'XML', value: 'xml'},
                ],
                default: 'same' },
              {
                  type: 'list',
                  name: 'ff4jPropertyStore',
                  message: 'Which database would you like to use to store *Properties* ?',
                  choices: [
                    {name: 'Same as Application', value: 'same'},
                    {name: 'Same as FeatureStore', value: 'featureStore'},
                    {name: 'Archaius', value: 'cassandra'},
                    {name: 'Cassandra', value: 'cassandra'},
                    {name: 'Commons-config', value: 'commonsconf'},
                    {name: 'Consul', value: 'consul'},
                    {name: 'ElasticSearch', value: 'elastic'},
                    {name: 'HazelCast', value: 'hazelCast'},
                    {name: 'HBase', value: 'hbase'},
                    {name: 'Ignite', value: 'ignite'},
                    {name: 'MongoDB', value: 'mongo'},
                    {name: 'Neo4j', value: 'neo4j'},
                    {name: 'Redis', value: 'neo4j'},
                    {name: 'SQL', value: 'sql'},
                    {name: 'XML', value: 'xml'},
                  ],
                  default: 'same'
                },
                {
                    type: 'list',
                    name: 'ff4jEventRepository',
                    message: 'Which database would you like to use to store *AuditTrail* ?',
                    choices: [
                      {name: 'Same as Application', value: 'same'},
                      {name: 'Cassandra', value: 'cassandra'},
                      {name: 'ElasticSearch', value: 'elastic'},
                      {name: 'HazelCast', value: 'hazelCast'},
                      {name: 'HBase', value: 'hbase'},
                      {name: 'Ignite', value: 'ignite'},
                      {name: 'MongoDB', value: 'mongo'},
                      {name: 'Neo4j', value: 'neo4j'},
                      {name: 'Redis', value: 'neo4j'},
                      {name: 'SQL', value: 'sql'},
                    ],
                    default: 'same' },
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
    	
    	this.log(`Writing()`);
    	
    	// Small function to copy template to destination
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };
        
        // COPY function
        this.copyFiles = function (files) {
            files.forEach( function(file) {
              jhipsterFunc.copyTemplate(file.from, file.to, 
            		  file.type? file.type: TPL, this, file.interpolate? { 'interpolate': file.interpolate } : undefined);
            }, this);
        };
        
        this.baseName 				= jhipsterVar.baseName;
        this.packageName 			= jhipsterVar.packageName;
this.angularAppName 		= jhipsterVar.angularAppName;
        this.clientFramework 		= jhipsterVar.clientFramework;
        this.clientPackageManager 	= jhipsterVar.clientPackageManager;
        
        const javaDir 				= jhipsterVar.javaDir;
        const resourceDir 			= jhipsterVar.resourceDir;
        const webappDir 			= jhipsterVar.webappDir;
        
        this.javaDir 				= jhipsterVar.javaDir;
        this.javaTemplateDir 		= 'src/main/java/package';
        this.message = this.props.message;

        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`angularAppName=${this.angularAppName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);
        this.log(`\nmessage=${this.message}`);
        this.log('------\n');

        // Update Dependencies
        if (jhipsterVar.buildTool === 'maven') {
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-core', 			     FF4J_VERSION);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-web', 				 FF4J_VERSION);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-spring-services', 	 FF4J_VERSION);
            jhipsterFunc.addMavenDependency('org.ff4j', 'ff4j-spring-boot-web-api',  FF4J_VERSION);
            
        } else if (jhipsterVar.buildTool === 'gradle') {
        	jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-core', 			 	 FF4J_VERSION);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-web',  			 	 FF4J_VERSION);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-spring-services', 	 FF4J_VERSION);
            jhipsterFunc.addGradleDependency('org.ff4j', 'ff4j-spring-boot-web-api', FF4J_VERSION);
            
        }
        
        // Copy Files (Java)
        files = [
        	// Register Servlet and FF4J bean
            { from: this.javaTemplateDir + '/config/ff4j/_FF4jWebConfiguration.java', to: this.javaDir + 'config/ff4j/FF4jWebConfiguration.java'}
          ];
          this.copyFiles(files);
          //jhipsterFunc.addChangelogToLiquibase(this.changelogDate + '_added_entity_EntityAuditEvent');
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
    	this.log(`end()`);
        this.log('End of ff4j generator');
    }
});


