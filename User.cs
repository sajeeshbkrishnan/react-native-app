using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{

    // User model class
    public class User
    {
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string UserAddres { get; set; }
        public string UserEmail { get; set; }
    }
}