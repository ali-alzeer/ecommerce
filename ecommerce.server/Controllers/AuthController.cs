using System.Net;
using ecommerce.data;
using ecommerce.data.Models;
using ecommerce.server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ecommerce.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediaService _mediaService;
        public AuthController(IConfiguration configuration, IMediaService mediaService)
        {
            this._configuration = configuration;
            this._mediaService = mediaService;
        }

        [HttpPost("signin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserResponseDTO> Signin([FromBody] UserSigninDTO userSigninDTO)
        {
            var SigninResult = AuthData.Signin(userSigninDTO);

            if (SigninResult == 1)
            {
                var user = AuthData.GetUser(userSigninDTO.Email, userSigninDTO.Password);
                if (user != null)
                {
                    var token = AuthData.GenerateAccessToken(_configuration, user.Email, user.Password);

                    return Ok(
                        new UserResponseDTO
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            Email = user.Email,
                            CreatedOn = user.CreatedOn,
                            UpdatedOn = user.UpdatedOn,
                            LastLoggingIn = user.LastLoggingIn,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Image = user.Image,
                            Token = token,
                        }
                        );
                }
                else
                {
                    return BadRequest("An error happened in signing in");
                }
            }
            else if (SigninResult == 0)
            {
                return BadRequest("Wrong credentials!");
            }
            else
            {
                return BadRequest("Unknown error");
            }
        }


        [HttpPost("signup")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserResponseDTO> Signup([FromBody] UserSignupDTO userSignupDTO)
        {
            bool EmailExisted = AuthData.IsEmailExisted(userSignupDTO.Email);
            if (EmailExisted)
            {
                return BadRequest("Email already exists");
            }
            else
            {
                var SignupResult = AuthData.Signup(userSignupDTO);

                if (SignupResult == 1)
                {
                    var user = AuthData.GetUser(userSignupDTO.Email, userSignupDTO.Password);
                    if (user != null)
                    {
                        var token = AuthData.GenerateAccessToken(_configuration, user.Email, user.Password);

                        return Ok(
                            new UserResponseDTO
                            {
                                Id = user.Id,
                                UserName = user.UserName,
                                Email = user.Email,
                                CreatedOn = user.CreatedOn,
                                UpdatedOn = user.UpdatedOn,
                                LastLoggingIn = user.LastLoggingIn,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Image = user.Image,
                                Token = token,
                            }
                            );
                    }
                    else
                    {
                        return BadRequest("An error happened in signing in");
                    }
                }
                else if (SignupResult == 0)
                {
                    return BadRequest("Wrong credentials!");
                }
                else
                {
                    return BadRequest("Unknown error");
                }
            }

        }

        [HttpGet("validate-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<bool> ValidateToken([FromHeader] string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
            };

            try
            {
                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }


        [Authorize]
        [HttpPost("change-user-data")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserResponseDTO> ChangeUserData([FromBody] UserChangeDataDTO userChangeDataDTO)
        {
            bool EmailExisted = AuthData.IsEmailExisted(userChangeDataDTO.Email);
            if (EmailExisted)
            {
                return BadRequest("Email already exists");
            }

            var ChangeDataResult = AuthData.ChangeUserData(userChangeDataDTO);

            if (ChangeDataResult == 1)
            {
                var user = AuthData.GetUser(userChangeDataDTO.Email, userChangeDataDTO.Password);
                if (user != null)
                {
                    var token = AuthData.GenerateAccessToken(_configuration, user.Email, user.Password);

                    return Ok(
                        new UserResponseDTO
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            Email = user.Email,
                            CreatedOn = user.CreatedOn,
                            UpdatedOn = user.UpdatedOn,
                            LastLoggingIn = user.LastLoggingIn,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Image = user.Image,
                            Token = token,
                        }
                        );
                }
                else
                {
                    return BadRequest("An error happened");
                }
            }
            else if (ChangeDataResult == 0)
            {
                return BadRequest("Could not change data");
            }
            else
            {
                return BadRequest("Unknown error");
            }
        }

        [Authorize]
        [HttpPost("change-user-image-upload")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserImageUrlDTO>> ChangeUserImageUpload(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("The image is required");
            }

            // Save to Cloudinarya
            var result = await _mediaService.UploadImageAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var userImageDTO = new UserImageUrlDTO
            {
                ImageUrl = result.SecureUrl.AbsoluteUri
            };

            return Ok(userImageDTO);

        }

        [Authorize]
        [HttpPost("change-user-image-save")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserResponseDTO> ChangeUserImageSave([FromBody] UserChangeImageDBDTO userChangeImageDBDTO)
        {

            // Deleting the old image
            var DeleteOldImageResult = AuthData.DeleteUserImage(userChangeImageDBDTO.Id);

            // Save to Database
            var ChangeImageResult = AuthData.ChangeUserImage(userChangeImageDBDTO);

            if (ChangeImageResult >= 1)
            {
                var user = AuthData.GetUserById(userChangeImageDBDTO.Id);
                if (user != null)
                {
                    var token = AuthData.GenerateAccessToken(_configuration, user.Email, user.Password);

                    return Ok(
                        new UserResponseDTO
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            Email = user.Email,
                            CreatedOn = user.CreatedOn,
                            UpdatedOn = user.UpdatedOn,
                            LastLoggingIn = user.LastLoggingIn,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Image = user.Image,
                            Token = token,
                        }
                        );
                }
                else
                {
                    return BadRequest("An error happened during getting the user");
                }
            }
            else if (ChangeImageResult == 0)
            {
                return BadRequest("An error happened during saving to the database");
            }
            else
            {
                return BadRequest("Unknown error");
            }

        }



        [Authorize]
        [HttpDelete("delete-user-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserResponseDTO> DeleteUserImage(int Id)
        {
            var userImage = AuthData.GetUserImageByUserId(Id);

            if (userImage == null)
            {
                return BadRequest("This user has no image");
            }

            try
            {
                var publicIdForUserImageUrl = AuthData.ExtractPublicIdFromCloudinaryUrl(userImage.ImageUrl);
                var result = _mediaService.DeleteMedia(publicIdForUserImageUrl);
                if (result.Result != "ok")
                {
                    return BadRequest("Image not found");
                }

                // Delete from database
                var DeleteUserImageResult = AuthData.DeleteUserImage(Id);

                if (DeleteUserImageResult == 2)
                {
                    var user = AuthData.GetUserById(Id);
                    if (user != null)
                    {
                        var token = AuthData.GenerateAccessToken(_configuration, user.Email, user.Password);

                        return Ok(
                            new UserResponseDTO
                            {
                                Id = user.Id,
                                UserName = user.UserName,
                                Email = user.Email,
                                CreatedOn = user.CreatedOn,
                                UpdatedOn = user.UpdatedOn,
                                LastLoggingIn = user.LastLoggingIn,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Image = user.Image,
                                Token = token,
                            }
                            );
                    }
                    else
                    {
                        return BadRequest("An error happened");
                    }
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpGet("user-comment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserCommentDTO> GetUserCommentDTOByUserId([FromQuery] int id)
        {
            UserCommentDTO? userCommentFromDB = ecommerce.data.AuthData.GetUserCommentDTOByUserId(id);

            if (userCommentFromDB == null)
            {
                return BadRequest($"Could not get the user with id {id}");
            }

            return Ok(userCommentFromDB);

        }


        [HttpGet("user-details")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserPreviewDTO> GetUserPreviewDTOByUserId([FromQuery] int id)
        {
            UserPreviewDTO? userPreviewFromDB = ecommerce.data.AuthData.GetUserPreviewDTOByUserId(id);

            if (userPreviewFromDB == null)
            {
                return BadRequest($"Could not get the user preview with id {id}");
            }

            return Ok(userPreviewFromDB);

        }


    }
}
