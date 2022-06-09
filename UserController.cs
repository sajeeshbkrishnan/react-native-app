using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UserController : ApiController
    {
        // GET API for getting all user from DB
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select UserID,UserName,UserAddress,UserEmail from dbo.UserDetails";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyAPPDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
                using (var da= new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        // GET API for fetching a user from DB using id
        public HttpResponseMessage Get(int id)
        {
           
            DataTable table = new DataTable();
            string query = @"select UserID,UserName,UserAddress,UserEmail from dbo.UserDetails where UserID="+id;

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyAPPDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        

        // POST API for inserting a user details to DB

        public string Post(User usr)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"insert into  dbo.UserDetails values ('"+usr.UserName+ @"',
                                                                     '" + usr.UserAddres + @"',
                                                                       '" + usr.UserEmail + @"' 


                )";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyAPPDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return null;
            }
            catch(Exception)
            {
                return "Failed to Add";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"delete from dbo.UserDetails where UserID=" + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyAPPDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return null;

            }
            catch (Exception)
            {
                return "Failed to delete";
            }
        }

    }
}
