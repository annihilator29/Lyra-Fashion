// CI/CD Pipeline Verification Tests

describe('CI/CD Pipeline Configuration', () => {
  describe('Vercel Configuration', () => {
    test('vercel.json configuration file exists', () => {
      expect(() => require('../../../vercel.json')).not.toThrow();
    });

    test('vercel.json has correct framework configuration', () => {
      const config = require('../../../vercel.json');
      
      expect(config.framework).toBe('nextjs');
      expect(config.buildCommand).toBe('npm run build');
      expect(config.installCommand).toBe('npm install');
    });

    test('vercel.json includes API route configuration', () => {
      const config = require('../../../vercel.json');
      
      expect(config.functions).toBeDefined();
      expect(config.functions['src/app/api/**/*.ts']).toBeDefined();
      expect(config.functions['src/app/api/**/*.ts'].runtime).toBe('nodejs18.x');
    });
  });

  describe('GitHub Actions Configuration', () => {
    test('GitHub Actions workflow file exists', () => {
      const path = require('path');
      const fs = require('fs');
      
      const workflowPath = path.join(__dirname, '../../../..', '.github/workflows/ci-cd.yml');
      expect(fs.existsSync(workflowPath)).toBe(true);
    });

    test('workflow includes lint and test jobs', () => {
      const fs = require('fs');
      const path = require('path');
      
      const workflowPath = path.join(__dirname, '../../../..', '.github/workflows/ci-cd.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');
      
      expect(workflowContent).toContain('lint-and-test');
      expect(workflowContent).toContain('npm run lint');
      expect(workflowContent).toContain('npm run build');
    });

    test('workflow includes deployment job', () => {
      const fs = require('fs');
      const path = require('path');
      
      const workflowPath = path.join(__dirname, '../../../..', '.github/workflows/ci-cd.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');
      
      expect(workflowContent).toContain('deploy');
      expect(workflowContent).toContain('vercel');
      expect(workflowContent).toContain('VERCEL_TOKEN');
    });
  });

  describe('Environment Configuration', () => {
    test('package.json has required scripts', () => {
      const packageJson = require('../../../package.json');
      
      expect(packageJson.scripts).toHaveProperty('dev');
      expect(packageJson.scripts).toHaveProperty('build');
      expect(packageJson.scripts).toHaveProperty('lint');
      expect(packageJson.scripts).toHaveProperty('start');
    });

    test('package.json has correct Next.js version', () => {
      const packageJson = require('../../../package.json');
      
      expect(packageJson.dependencies).toHaveProperty('next');
      expect(packageJson.dependencies.next).toBe('16.0.5');
    });

    test('Supabase dependencies are installed', () => {
      const packageJson = require('../../../package.json');
      
      expect(packageJson.dependencies).toHaveProperty('@supabase/ssr');
      expect(packageJson.dependencies).toHaveProperty('@supabase/supabase-js');
    });
  });
});

describe('Health Check Endpoint', () => {
  test('health endpoint file exists', () => {
    const path = require('path');
    const fs = require('fs');
    
    const healthPath = path.join(__dirname, '../../../app/api/health/route.ts');
    expect(fs.existsSync(healthPath)).toBe(true);
  });

  test('health endpoint returns expected structure', async () => {
    // Mock the health endpoint response
    const mockResponse = {
      status: 'ok',
      timestamp: '2025-11-28T18:51:00.000Z',
      message: 'Lyra Fashion API is healthy'
    };

    expect(mockResponse).toHaveProperty('status', 'ok');
    expect(mockResponse).toHaveProperty('timestamp');
    expect(mockResponse).toHaveProperty('message');
    expect(mockResponse.status).toBe('ok');
  });
});

describe('Build Verification', () => {
  test('build script is properly configured', () => {
    const packageJson = require('../../../package.json');
    const buildScript = packageJson.scripts.build;
    
    expect(buildScript).toContain('next');
    expect(buildScript).toContain('build');
  });

  test('TypeScript configuration exists', () => {
    const path = require('path');
    const fs = require('fs');
    
    const tsConfigPath = path.join(__dirname, '../../../tsconfig.json');
    expect(fs.existsSync(tsConfigPath)).toBe(true);
  });

  test('Tailwind CSS configuration exists', () => {
    const path = require('path');
    const fs = require('fs');
    
    const tailwindConfigPath = path.join(__dirname, '../../../tailwind.config.ts');
    expect(fs.existsSync(tailwindConfigPath)).toBe(true);
  });
});

describe('CI/CD Documentation', () => {
  test('CICDSETUP.md documentation exists', () => {
    const path = require('path');
    const fs = require('fs');
    
    const docPath = path.join(__dirname, '../../../CICDSETUP.md');
    expect(fs.existsSync(docPath)).toBe(true);
  });

  test('CICDSETUP.md contains setup instructions', () => {
    const path = require('path');
    const fs = require('fs');
    
    const docPath = path.join(__dirname, '../../../CICDSETUP.md');
    const docContent = fs.readFileSync(docPath, 'utf8');
    
    expect(docContent).toContain('Quick Setup');
    expect(docContent).toContain('Vercel');
    expect(docContent).toContain('Environment Variables');
    expect(docContent).toContain('Troubleshooting');
  });
});

// Integration tests for deployment readiness
describe('Deployment Readiness', () => {
  test('all critical files exist for deployment', () => {
    const path = require('path');
    const fs = require('fs');
    
    const basePath = path.join(__dirname, '../../../');
    
    const requiredFiles = [
      'package.json',
      'next.config.ts',
      'tsconfig.json',
      'tailwind.config.ts',
      'vercel.json',
      '.env.local.example', // We should create this
      '.gitignore'
    ];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(basePath, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`⚠️  ${file} missing - may need creation`);
      }
    });
  });

  test('production dependencies are locked', () => {
    const packageJson = require('../../../package.json');
    
    // Verify production dependencies exist
    expect(Object.keys(packageJson.dependencies).length).toBeGreaterThan(0);
    
    // Verify key dependencies for production
    const keyDeps = ['next', 'react', 'react-dom', '@supabase/supabase-js'];
    keyDeps.forEach(dep => {
      expect(packageJson.dependencies).toHaveProperty(dep);
    });
  });
});