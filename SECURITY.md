# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Benny's Emporium, please email Benjamin Amory at **ligersama777@gmail.com** with the following information:

- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)

**Please do not open a public GitHub issue for security vulnerabilities.** We will work with you to address the issue responsibly.

## Security Best Practices

### For Users

- Keep your login credentials secure
- Enable two-factor authentication when available
- Never share your API keys or tokens
- Report suspicious activity immediately
- Keep your browser and software up to date

### For Developers

- All API calls must use HTTPS
- Sensitive data should be encrypted at rest
- Use environment variables for secrets (never commit them)
- Validate and sanitize all user inputs
- Follow OWASP security guidelines
- Keep dependencies up to date
- Run security audits regularly: `npm audit`

### For Administrators

- Regularly review access logs
- Monitor for suspicious activity
- Keep the database backed up
- Use strong passwords for database access
- Implement rate limiting on API endpoints
- Enable CORS only for trusted domains

## Security Features

Benny's Emporium includes the following security measures:

- **Authentication:** Manus OAuth with JWT sessions
- **Encryption:** SSL/TLS for data in transit
- **Database:** Encrypted connections with password protection
- **API Security:** Type-safe tRPC with input validation
- **CORS:** Configured to prevent unauthorized cross-origin requests
- **Rate Limiting:** Prevents brute force attacks
- **Input Validation:** All user inputs are validated and sanitized
- **SQL Injection Protection:** Uses parameterized queries via Drizzle ORM

## Vulnerability Disclosure Timeline

We aim to:

1. Acknowledge receipt of your report within 24 hours
2. Provide an initial assessment within 3 days
3. Release a patch within 7 days (for critical vulnerabilities)
4. Release a patch within 30 days (for non-critical vulnerabilities)

## Security Updates

Security updates will be released as soon as patches are available. Users are encouraged to update immediately when security patches are released.

## Third-party Dependencies

We regularly audit our dependencies for known vulnerabilities. To check for vulnerabilities in your local copy:

```bash
pnpm audit
```

## Contact

**Security Lead:** Benjamin Amory  
**Email:** ligersama777@gmail.com  
**Phone:** 484-201-7626  

---

Thank you for helping keep Benny's Emporium secure!
