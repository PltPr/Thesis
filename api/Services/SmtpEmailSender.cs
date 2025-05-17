using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.OpenApi.Expressions;

namespace api.Services
{
    public class SmtpEmailSender:IEmailSender
    {
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _port = 587;
        private readonly IConfiguration _config;
        
        public SmtpEmailSender(IConfiguration config)
        {
            _config = config;
        }
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var client = new SmtpClient(_smtpServer, _port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_config["EmailSender:Email"], _config["EmailSender:Key"]),
                EnableSsl = true
            };
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_config["EmailSender:Email"]),
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            return client.SendMailAsync(mailMessage);
        }
    }
}