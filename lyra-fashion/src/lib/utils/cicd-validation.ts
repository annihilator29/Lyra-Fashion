// CI/CD Pipeline Validation Utility

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface ValidationResult {
  passed: boolean;
  message: string;
  details?: any;
}

export interface CICDValidationReport {
  timestamp: string;
  vercelConfig: ValidationResult;
  githubActions: ValidationResult;
  environmentConfig: ValidationResult;
  healthEndpoint: ValidationResult;
  buildConfig: ValidationResult;
  documentation: ValidationResult;
  overall: ValidationResult;
}

export async function validateCICDSetup(): Promise<CICDValidationReport> {
  const timestamp = new Date().toISOString();
  
  // Validate Vercel configuration
  const vercelConfig = validateVercelConfig();
  
  // Validate GitHub Actions
  const githubActions = validateGitHubActions();
  
  // Validate environment configuration
  const environmentConfig = validateEnvironmentConfig();
  
  // Validate health endpoint
  const healthEndpoint = validateHealthEndpoint();
  
  // Validate build configuration
  const buildConfig = validateBuildConfig();
  
  // Validate documentation
  const documentation = validateDocumentation();
  
  // Calculate overall result
  const allValid = [
    vercelConfig.passed,
    githubActions.passed,
    environmentConfig.passed,
    healthEndpoint.passed,
    buildConfig.passed,
    documentation.passed
  ].every(Boolean);
  
  const overall: ValidationResult = {
    passed: allValid,
    message: allValid ? 'All CI/CD validations passed' : 'Some CI/CD validations failed',
    details: {
      vercel: vercelConfig.passed,
      github: githubActions.passed,
      environment: environmentConfig.passed,
      health: healthEndpoint.passed,
      build: buildConfig.passed,
      docs: documentation.passed
    }
  };
  
  return {
    timestamp,
    vercelConfig,
    githubActions,
    environmentConfig,
    healthEndpoint,
    buildConfig,
    documentation,
    overall
  };
}

function validateVercelConfig(): ValidationResult {
  try {
    const configPath = join(process.cwd(), 'vercel.json');
    
    if (!existsSync(configPath)) {
      return {
        passed: false,
        message: 'vercel.json configuration file not found'
      };
    }
    
    const config = JSON.parse(readFileSync(configPath, 'utf8'));
    
    const checks = [
      { condition: config.framework === 'nextjs', message: 'Framework should be nextjs' },
      { condition: config.buildCommand === 'npm run build', message: 'Build command should be "npm run build"' },
      { condition: config.installCommand === 'npm install', message: 'Install command should be "npm install"' },
      { condition: config.functions && config.functions['src/app/api/**/*.ts'], message: 'API routes should be configured' }
    ];
    
    const failedChecks = checks.filter(check => !check.condition);
    
    if (failedChecks.length > 0) {
      return {
        passed: false,
        message: 'Vercel configuration has issues',
        details: failedChecks.map(c => c.message)
      };
    }
    
    return {
      passed: true,
      message: 'Vercel configuration is valid',
      details: config
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate Vercel configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateGitHubActions(): ValidationResult {
  try {
    const workflowPath = join(process.cwd(), '.github/workflows/ci-cd.yml');
    
    if (!existsSync(workflowPath)) {
      return {
        passed: false,
        message: 'GitHub Actions workflow file not found'
      };
    }
    
    const workflowContent = readFileSync(workflowPath, 'utf8');
    
    const checks = [
      { condition: workflowContent.includes('lint-and-test'), message: 'Should include lint-and-test job' },
      { condition: workflowContent.includes('npm run lint'), message: 'Should run npm run lint' },
      { condition: workflowContent.includes('npm run build'), message: 'Should run npm run build' },
      { condition: workflowContent.includes('deploy'), message: 'Should include deploy job' },
      { condition: workflowContent.includes('vercel'), message: 'Should include Vercel deployment' }
    ];
    
    const failedChecks = checks.filter(check => !check.condition);
    
    if (failedChecks.length > 0) {
      return {
        passed: false,
        message: 'GitHub Actions workflow has issues',
        details: failedChecks.map(c => c.message)
      };
    }
    
    return {
      passed: true,
      message: 'GitHub Actions workflow is valid'
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate GitHub Actions configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateEnvironmentConfig(): ValidationResult {
  try {
    const packagePath = join(process.cwd(), 'package.json');
    const envPath = join(process.cwd(), '.env.local');
    
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    
    const checks = [
      { condition: packageJson.scripts && packageJson.scripts.build, message: 'Build script should exist' },
      { condition: packageJson.scripts && packageJson.scripts.lint, message: 'Lint script should exist' },
      { condition: packageJson.dependencies && packageJson.dependencies.next, message: 'Next.js should be installed' },
      { condition: packageJson.dependencies && packageJson.dependencies['@supabase/supabase-js'], message: 'Supabase should be installed' },
      { condition: existsSync(envPath), message: 'Environment file should exist' }
    ];
    
    const failedChecks = checks.filter(check => !check.condition);
    
    if (failedChecks.length > 0) {
      return {
        passed: false,
        message: 'Environment configuration has issues',
        details: failedChecks.map(c => c.message)
      };
    }
    
    return {
      passed: true,
      message: 'Environment configuration is valid'
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate environment configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateHealthEndpoint(): ValidationResult {
  try {
    const healthPath = join(process.cwd(), 'src/app/api/health/route.ts');
    
    if (!existsSync(healthPath)) {
      return {
        passed: false,
        message: 'Health endpoint file not found'
      };
    }
    
    const healthContent = readFileSync(healthPath, 'utf8');
    
    const checks = [
      { condition: healthContent.includes('export async function GET'), message: 'Should export GET function' },
      { condition: healthContent.includes('status'), message: 'Should include status in response' },
      { condition: healthContent.includes('timestamp'), message: 'Should include timestamp in response' },
      { condition: healthContent.includes('NextResponse'), message: 'Should use NextResponse' }
    ];
    
    const failedChecks = checks.filter(check => !check.condition);
    
    if (failedChecks.length > 0) {
      return {
        passed: false,
        message: 'Health endpoint has issues',
        details: failedChecks.map(c => c.message)
      };
    }
    
    return {
      passed: true,
      message: 'Health endpoint is valid'
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate health endpoint',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateBuildConfig(): ValidationResult {
  try {
    const configFiles = [
      'tsconfig.json',
      'tailwind.config.ts',
      'next.config.ts'
    ];
    
    const missingFiles = configFiles.filter(file => !existsSync(join(process.cwd(), file)));
    
    if (missingFiles.length > 0) {
      return {
        passed: false,
        message: 'Missing build configuration files',
        details: missingFiles
      };
    }
    
    return {
      passed: true,
      message: 'Build configuration is valid',
      details: configFiles
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate build configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateDocumentation(): ValidationResult {
  try {
    const docPath = join(process.cwd(), 'CICDSETUP.md');
    
    if (!existsSync(docPath)) {
      return {
        passed: false,
        message: 'CI/CD documentation not found'
      };
    }
    
    const docContent = readFileSync(docPath, 'utf8');
    
    const checks = [
      { condition: docContent.includes('Vercel'), message: 'Should mention Vercel setup' },
      { condition: docContent.includes('Environment Variables'), message: 'Should cover environment variables' },
      { condition: docContent.includes('Troubleshooting'), message: 'Should include troubleshooting' }
    ];
    
    const failedChecks = checks.filter(check => !check.condition);
    
    if (failedChecks.length > 0) {
      return {
        passed: false,
        message: 'Documentation has missing sections',
        details: failedChecks.map(c => c.message)
      };
    }
    
    return {
      passed: true,
      message: 'CI/CD documentation is valid'
    };
    
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to validate documentation',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function runCICDSValidation(): Promise<void> {
  console.log('🚀 Running CI/CD Pipeline Validation...');
  
  const report = await validateCICDSetup();
  
  console.log('\n📊 Validation Results:');
  console.log(`Vercel Config: ${report.vercelConfig.passed ? '✅' : '❌'} ${report.vercelConfig.message}`);
  console.log(`GitHub Actions: ${report.githubActions.passed ? '✅' : '❌'} ${report.githubActions.message}`);
  console.log(`Environment Config: ${report.environmentConfig.passed ? '✅' : '❌'} ${report.environmentConfig.message}`);
  console.log(`Health Endpoint: ${report.healthEndpoint.passed ? '✅' : '❌'} ${report.healthEndpoint.message}`);
  console.log(`Build Config: ${report.buildConfig.passed ? '✅' : '❌'} ${report.buildConfig.message}`);
  console.log(`Documentation: ${report.documentation.passed ? '✅' : '❌'} ${report.documentation.message}`);
  
  console.log(`\n🎯 Overall: ${report.overall.passed ? '✅ PASSED' : '❌ FAILED'} ${report.overall.message}`);
  
  if (!report.overall.passed) {
    console.log('\n❗ Issues found:');
    Object.entries(report.overall.details).forEach(([key, passed]) => {
      if (!passed) {
        console.log(`   - ${key} configuration needs attention`);
      }
    });
  } else {
    console.log('\n🎉 CI/CD Pipeline is ready for deployment!');
  }
  
  console.log(`\nGenerated at: ${report.timestamp}`);
}

// Export for use in other modules
export const validateCICDSETUP = runCICDSValidation;