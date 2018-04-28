module.exports = function(grunt) {

    // Project Configuration
    grunt.initConfig({
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            target: ['watch', 'nodemon']
        },
        watch: {
            options: {
                atBegin: true,
                spawn: false
            },
            build: {
                files: ['src/**/*.*'],
                tasks: ['build']
            }
        },
        nodemon: {
            dev: {
                script: 'dist/app.js'
            }
        },
        copy: {
            build: {
                files: [
                    { expand: true, cwd: 'src/templates', src: ['**'], dest: 'dist/templates' }
                ]
            }
        },
        ts: {
            options: {
                sourceMap: false,
                suppressImplicitAnyIndexErrors: true
            },
            build: {
                tsconfig: true
            }
        },
        tslint: {
            options: {
                configuration: 'tslint.json',
                force: false,
                fix: false
            },
            build: {
                src: ['src/**/*.ts']
            }
        }
    });

    // Loading Plugin(s)
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    // Default Task(s)
    grunt.registerTask('build', ['copy', 'tslint', 'ts']);

}
