using ecommerce.data.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ecommerce.data
{
    public class AuthData
    {
        public static int Signin(UserSigninDTO userSigninDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_Signin", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Username", userSigninDTO.UserName);
                        cmd.Parameters.AddWithValue("@Email", userSigninDTO.Email);

                        // Hash the concatenated value
                        string enteredPasswordHash = HashPassword(userSigninDTO.Password);

                        // Compare the entered password hash with the stored hash
                        cmd.Parameters.AddWithValue("@Password", enteredPasswordHash);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }
        public static int Signup(UserSignupDTO userSignupDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_Signup", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Username", userSignupDTO.UserName);
                        cmd.Parameters.AddWithValue("@Email", userSignupDTO.Email);

                        // Hash the concatenated value
                        string enteredPasswordHash = HashPassword(userSignupDTO.Password);

                        // Compare the entered password hash with the stored hash
                        cmd.Parameters.AddWithValue("@Password", enteredPasswordHash);
                        cmd.Parameters.AddWithValue("@FirstName", userSignupDTO.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", userSignupDTO.LastName);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }
        public static User? GetUser(string Email, string Password)
        {
            User userFromDB;

            try
            {
                using (var connection = new SqlConnection(Settings.GetConnectionString()))
                using (var command = new SqlCommand("SP_GetUser", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", Email);

                    // Convert the stored salt and entered password to byte arrays
                    byte[] enteredPasswordBytes = Encoding.UTF8.GetBytes(Password);
                    byte[] storedSaltBytes = Encoding.UTF8.GetBytes(Settings.GetSalt());

                    // Concatenate entered password and stored salt
                    byte[] saltedPassword = new byte[enteredPasswordBytes.Length + storedSaltBytes.Length];
                    Buffer.BlockCopy(enteredPasswordBytes, 0, saltedPassword, 0, enteredPasswordBytes.Length);
                    Buffer.BlockCopy(storedSaltBytes, 0, saltedPassword, enteredPasswordBytes.Length, storedSaltBytes.Length);

                    // Hash the concatenated value
                    string enteredPasswordHash = HashPassword(Password);

                    // Compare the entered password hash with the stored hash
                    command.Parameters.AddWithValue("@Password", enteredPasswordHash);

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userFromDB = new User
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                Password = reader.GetString(reader.GetOrdinal("Password")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Image = null
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                    using (SqlCommand cmd2 = new SqlCommand("SP_GetUserImageByUserId", connection))
                    {
                        cmd2.CommandType = CommandType.StoredProcedure;
                        cmd2.Parameters.AddWithValue("@Id", userFromDB.Id);

                        using (var reader2 = cmd2.ExecuteReader())
                        {

                            if (reader2.Read())
                            {
                                userFromDB.Image =
                                        new Image
                                        {
                                            Id = reader2.GetInt32(reader2.GetOrdinal("Id")),
                                            ImageUrl = reader2.GetString(reader2.GetOrdinal("ImageUrl"))
                                        };
                            };
                        }
                    }

                    return userFromDB;


                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static User? GetUserById(int Id)
        {
            User userFromDB;

            try
            {
                using (var connection = new SqlConnection(Settings.GetConnectionString()))
                using (var command = new SqlCommand("SP_GetUserById", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", Id);

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userFromDB = new User
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                Password = reader.GetString(reader.GetOrdinal("Password")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Image = null
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                    using (SqlCommand cmd2 = new SqlCommand("SP_GetUserImageByUserId", connection))
                    {
                        cmd2.CommandType = CommandType.StoredProcedure;
                        cmd2.Parameters.AddWithValue("@Id", userFromDB.Id);

                        using (var reader2 = cmd2.ExecuteReader())
                        {

                            if (reader2.Read())
                            {
                                userFromDB.Image =
                                        new Image
                                        {
                                            Id = reader2.GetInt32(reader2.GetOrdinal("Id")),
                                            ImageUrl = reader2.GetString(reader2.GetOrdinal("ImageUrl"))
                                        };
                            };
                        }
                    }

                    return userFromDB;


                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static Image? GetUserImageByUserId(int Id)
        {
            Image imageFromDB;

            try
            {
                using (var connection = new SqlConnection(Settings.GetConnectionString()))
                using (var command = new SqlCommand("SP_GetUserImageByUserId", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", Id);

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            imageFromDB = new Image
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                    return imageFromDB;


                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int ChangeUserData(UserChangeDataDTO userChangeDataDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_ChangeUserData", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", userChangeDataDTO.Id);
                        cmd.Parameters.AddWithValue("@FirstName", userChangeDataDTO.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", userChangeDataDTO.LastName);
                        cmd.Parameters.AddWithValue("@UserName", userChangeDataDTO.UserName);
                        cmd.Parameters.AddWithValue("@Email", userChangeDataDTO.Email);

                        // Hash the concatenated value
                        string enteredPasswordHash = HashPassword(userChangeDataDTO.Password);

                        // Compare the entered password hash with the stored hash
                        cmd.Parameters.AddWithValue("@Password", enteredPasswordHash);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }
        public static int ChangeUserImage(UserChangeImageDBDTO userChangeImageDBDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_ChangeUserImage", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", userChangeImageDBDTO.Id);
                        cmd.Parameters.AddWithValue("@ImageUrl", userChangeImageDBDTO.ImageUrl);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }
        public static int DeleteUserImage(int UserId)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DeleteUserImage", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", UserId);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }
        public static bool IsEmailExisted(string Email)
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnectionString()))
                using (var command = new SqlCommand("SP_IsEmailExisted", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", Email);

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static string ExtractPublicIdFromCloudinaryUrl(string cloudinaryUrl)
        {
            if (string.IsNullOrWhiteSpace(cloudinaryUrl))
            {
                throw new ArgumentException("The URL cannot be null or empty.", nameof(cloudinaryUrl));
            }

            // Example Cloudinary URL: https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg
            // Split the URL by '/'
            var parts = cloudinaryUrl.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);

            // Check if the URL has the expected format
            if (parts.Length < 3 || parts[3] != "image" || parts[4] != "upload")
            {
                throw new FormatException("The provided URL does not appear to be a valid Cloudinary URL.");
            }

            // The publicId is the next part after 'upload'
            var publicIdWithVersion = parts[6];

            // If the publicId contains a version, split it
            var publicIdParts = publicIdWithVersion.Split(new[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
            var publicId = publicIdParts[0];

            return publicId;

        }

        public static string GenerateAccessToken(IConfiguration configuration, string Email, string Password)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Email",Email),
                new Claim("Password",Password),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signin = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: signin
                );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }
        public static string HashPassword(string password)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            // Constant salt
            byte[] salt = Encoding.UTF8.GetBytes(Settings.GetSalt());

            // Choose a strong cryptographic hash function (e.g., SHA256)
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                // Convert password to byte array
                var passwordBytes = Encoding.UTF8.GetBytes(password);

                // Combine salt and password for hashing
                var combinedBytes = Combine(salt, passwordBytes);

                // Hash the combined bytes
                var hashedBytes = sha256.ComputeHash(combinedBytes);

                // Combine the salt and hashed bytes for storage (optional, as salt is constant)
                var combinedHash = Combine(salt, hashedBytes);

                // Convert the final byte array to a string representation (e.g., Base64)
                return Convert.ToBase64String(combinedHash);
            }
        }
        private static byte[] Combine(byte[] data1, byte[] data2)
        {
            var combinedLength = data1.Length + data2.Length;
            var combined = new byte[combinedLength];
            Array.Copy(data1, 0, combined, 0, data1.Length);
            Array.Copy(data2, 0, combined, data1.Length, data2.Length);
            return combined;
        }


        public static UserCommentDTO? GetUserCommentDTOByUserId(int Id)
        {
            UserCommentDTO userCommentDTO = new UserCommentDTO { Id = 0 };

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetUserById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                userCommentDTO = new UserCommentDTO
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                                    UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                    Image = null
                                };
                            };
                        }

                        if (userCommentDTO.Id != 0)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_GetUserImageByUserId", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@Id", userCommentDTO.Id);

                                using (var reader = cmd2.ExecuteReader())
                                {

                                    if (reader.Read())
                                    {
                                        userCommentDTO.Image =
                                                new Image
                                                {
                                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                                                };
                                    };
                                }
                            }

                            return userCommentDTO;

                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch
            {
                return null;
            }
        }


        public static UserPreviewDTO? GetUserPreviewDTOByUserId(int Id)
        {
            UserPreviewDTO userPreviewDTO = new UserPreviewDTO { Id = 0 };

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetUserById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                userPreviewDTO = new UserPreviewDTO
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                                    UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                    Image = null
                                };
                            };
                        }

                        if (userPreviewDTO.Id != 0)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_GetUserImageByUserId", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@Id", userPreviewDTO.Id);

                                using (var reader = cmd2.ExecuteReader())
                                {

                                    if (reader.Read())
                                    {
                                        userPreviewDTO.Image =
                                                new Image
                                                {
                                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                                                };
                                    };
                                }
                            }

                            return userPreviewDTO;

                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch
            {
                return null;
            }
        }

    }


}
