# SuperPos - Quantum & Cryptography Learning Platform

Production-ready deployment configured for **Azure (Backend) + Vercel (Frontend)**.

## 🚀 Quick Start

### Local Development

```bash
# Backend
cd SuperPos
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (new terminal)
cd nextpos
npm install
npm run dev
```

### Production Deployment

```bash
# 1. Setup Azure resources
az group create --name superpos-prod --location eastus

# 2. Deploy (automated via GitHub Actions)
git push origin main

# 3. View deployment
# Azure: https://superpos-prod-api.azurewebsites.net
# Vercel: https://superpos.vercel.app
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Essential commands and URLs |
| [PRODUCTION_READY.md](./PRODUCTION_READY.md) | What was implemented |
| [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) | Step-by-step deployment guide |
| [CI_CD_SETUP.md](./CI_CD_SETUP.md) | GitHub Actions & Vercel setup |
| [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Pre-deployment verification |

## 🏗️ Architecture

```
Frontend (Vercel)          Backend (Azure)            Database
┌──────────────────┐       ┌──────────────────┐       ┌──────────────┐
│  Next.js SPA     │◄──────│  Django REST API │◄──────│  PostgreSQL  │
│  CDN + Static    │   HTTPS/CORS           │       │  + Backups   │
│  Analytics       │       │  Gunicorn (4x)  │       │              │
└──────────────────┘       └──────────────────┘       └──────────────┘
        │                           │                        │
        │                           │                        │
    Auto-deploy               Health Checks           Auto-backups
    on push                    /api/health/           Geo-redundant
```

## ✨ Key Features

### Security ✅
- HTTPS/TLS 1.2+ enforced
- CSRF + XSS protection
- SQL injection prevention (ORM)
- Rate limiting (100/day anon, 1000/day users)
- HSTS headers
- Secure cookies (HttpOnly, Secure)
- Non-root container execution
- GitHub Secrets for credentials

### Performance ✅
- Multi-stage Docker builds
- Gunicorn with 4 workers
- WhiteNoise static compression
- Database connection pooling
- Django caching system
- Next.js standalone build
- CDN distribution via Vercel

### Reliability ✅
- Health check endpoints
- Automatic backups (35 days prod)
- Deployment health checks
- Rollback procedures
- Logging with rotation
- Error tracking

### Scalability ✅
- Container orchestration ready
- Database replication support
- Vercel auto-scaling
- Horizontal scaling via App Service
- Load balancer compatible

## 📦 Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | Next.js 15, React 18, TypeScript, Tailwind, Radix UI |
| Backend | Django 5.2, Django REST Framework, Gunicorn |
| Database | PostgreSQL 11, SQLite (dev) |
| Deployment | Docker, Azure App Service, Container Registry, Vercel |
| CI/CD | GitHub Actions, Trivy scanning |
| IaC | Bicep (Azure) |

## 📋 Project Structure

```
SuperPos/
├── .github/workflows/          # Automated deployments
│   ├── deploy.yml             # Backend → Azure
│   └── deploy-frontend.yml    # Frontend → Vercel
├── infrastructure/             # Infrastructure as Code
│   ├── main.bicep             # Azure resources
│   └── nginx.conf             # Reverse proxy config
├── SuperPos/                  # Django backend
│   ├── Dockerfile             # Production image
│   ├── requirements.txt        # Optimized dependencies
│   ├── SuperPos/settings.py   # Production settings
│   ├── Pos/views.py          # API endpoints
│   ├── Pos/urls.py           # URL routing
│   └── .env.example          # Environment template
├── nextpos/                   # Next.js frontend
│   ├── Dockerfile            # Production image
│   ├── vercel.json          # Vercel config
│   ├── next.config.ts       # Security headers
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment template
├── QUICKSTART.md            # Essential commands
├── PRODUCTION_READY.md      # Implementation summary
├── PRODUCTION_DEPLOYMENT.md # Deployment guide
├── CI_CD_SETUP.md          # CI/CD configuration
└── PRODUCTION_CHECKLIST.md # Pre-deployment checklist
```

## 🔧 Configuration

### Environment Variables

**Backend** (`SuperPos/.env`):
```
SECRET_KEY=<secure-random-key>
DEBUG=False
DATABASE_URL=postgresql://user:pass@host/db
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://superpos.vercel.app
GENERATIVEAI_API_KEY=<your-api-key>
```

**Frontend** (`nextpos/.env.local`):
```
NEXT_PUBLIC_API_URL=https://superpos-prod-api.azurewebsites.net
```

See [.env examples](./SuperPos/.env.example) for complete templates.

## 🚀 Deployment Status

| Component | Status | Platform |
|-----------|--------|----------|
| Backend | ✅ Ready | Azure App Service |
| Frontend | ✅ Ready | Vercel |
| Database | ✅ Configured | PostgreSQL |
| CI/CD | ✅ Configured | GitHub Actions |
| Monitoring | ✅ Ready | Azure + Vercel |
| Security | ✅ Hardened | Full stack |

## 📊 Monitoring

### Dashboards
- **Azure Portal**: https://portal.azure.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: https://github.com/your-repo/actions

### Health Checks
```bash
# Backend health
curl https://superpos-prod-api.azurewebsites.net/api/health/

# Frontend health
curl https://superpos.vercel.app
```

### Logs
```bash
# Azure backend logs
az webapp log tail -n superpos-prod-api -g superpos-prod

# Vercel deployment logs
vercel logs <deployment-id>
```

## 🔐 Security

### Implemented
✅ HTTPS/TLS 1.2+  
✅ CSRF protection  
✅ XSS prevention  
✅ SQL injection prevention  
✅ Rate limiting  
✅ Secure headers  
✅ No hardcoded secrets  
✅ Container security  
✅ CI/CD scanning  

### Ongoing
- Monthly security updates
- Quarterly security audit
- Regular dependency updates
- Log monitoring for anomalies

## 💰 Cost Estimates

| Service | Dev | Prod |
|---------|-----|------|
| Backend | $10-15 | $100-150 |
| Database | $15-20 | $50-100 |
| Registry | $5 | $5 |
| Frontend (Vercel) | $0 | $0-20 |
| **Total** | **$30-40** | **$155-275** |

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md#cost-optimization) for details.

## 📖 Documentation Guide

**New to the project?**  
→ Start with [QUICKSTART.md](./QUICKSTART.md)

**Deploying to production?**  
→ Follow [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

**Setting up CI/CD?**  
→ Read [CI_CD_SETUP.md](./CI_CD_SETUP.md)

**Before deploying?**  
→ Use [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

**Learn what was done?**  
→ See [PRODUCTION_READY.md](./PRODUCTION_READY.md)

## 🐛 Troubleshooting

### Backend Issues
```bash
az webapp log tail -n superpos-prod-api -g superpos-prod
```

### Frontend Issues
```bash
# Check Vercel logs in dashboard
# or via Vercel CLI
vercel logs <deployment-id>
```

### Database Issues
```bash
psql $DATABASE_URL -c "SELECT 1"
```

See [PRODUCTION_DEPLOYMENT.md - Troubleshooting](./PRODUCTION_DEPLOYMENT.md#troubleshooting) for detailed steps.

## 🤝 Support

- 📚 [Django Documentation](https://docs.djangoproject.com/)
- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 📚 [Azure Documentation](https://docs.microsoft.com/azure/)
- 📚 [Vercel Documentation](https://vercel.com/docs)

## 📝 License

[Add your license here]

## ✅ Production Ready

This project is **fully production-ready** with:
- ✅ Security hardened
- ✅ Performance optimized
- ✅ Automatically deployed
- ✅ Thoroughly documented
- ✅ Monitored and logged
- ✅ Ready for scaling

**Deployment time: <1 hour**

---

**Last Updated**: 2026-03-03  
**Status**: ✅ PRODUCTION READY
