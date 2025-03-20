USE [master]
GO
/****** Object:  Database [ECOMMERCE_DB]    Script Date: 07/02/2025 11:10:28 ص ******/
CREATE DATABASE [ECOMMERCE_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ECOMMERCE_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMERCE_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ECOMMERCE_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMERCE_DB_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ECOMMERCE_DB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ECOMMERCE_DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ECOMMERCE_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ECOMMERCE_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ECOMMERCE_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ECOMMERCE_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ECOMMERCE_DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET RECOVERY FULL 
GO
ALTER DATABASE [ECOMMERCE_DB] SET  MULTI_USER 
GO
ALTER DATABASE [ECOMMERCE_DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ECOMMERCE_DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ECOMMERCE_DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ECOMMERCE_DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ECOMMERCE_DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ECOMMERCE_DB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ECOMMERCE_DB', N'ON'
GO
ALTER DATABASE [ECOMMERCE_DB] SET QUERY_STORE = ON
GO
ALTER DATABASE [ECOMMERCE_DB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ECOMMERCE_DB]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CommentContent] [nvarchar](100) NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ProductId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ImageUrl] [nvarchar](200) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Price] [int] NOT NULL,
	[Rating] [smallint] NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[CategoryId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductsImages]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductsImages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[ImageId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ratings]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ratings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RatingContent] [smallint] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ProductId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Regexes]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Regexes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Regex] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[LastLoggingIn] [datetime] NOT NULL,
	[ImageId] [int] NULL,
 CONSTRAINT [PK__Users__3214EC070F6E5774] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 
GO
INSERT [dbo].[Categories] ([Id], [Title]) VALUES (1, N'clothes')
GO
INSERT [dbo].[Categories] ([Id], [Title]) VALUES (2, N'drinks')
GO
INSERT [dbo].[Categories] ([Id], [Title]) VALUES (3, N'technology')
GO
INSERT [dbo].[Categories] ([Id], [Title]) VALUES (4, N'accessories')
GO
INSERT [dbo].[Categories] ([Id], [Title]) VALUES (5, N'other')
GO
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Comments] ON 
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (2, N'This product is really good', 18, CAST(N'2024-12-25T00:00:00.000' AS DateTime), 11)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (3, N'Bad product', 17, CAST(N'2024-12-25T00:00:00.000' AS DateTime), 11)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (8, N'No images??, how to preview the product if there is no images for it?', 18, CAST(N'2024-12-27T22:39:43.267' AS DateTime), 15)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (9, N'Very elegant 👍🏻', 19, CAST(N'2024-12-30T12:27:06.633' AS DateTime), 9)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (10, N'Really nice suit 💙', 20, CAST(N'2024-12-30T12:31:19.277' AS DateTime), 9)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (11, N'I liked it', 20, CAST(N'2024-12-30T12:32:13.990' AS DateTime), 7)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (12, N'Bad cloth type', 21, CAST(N'2024-12-30T12:36:47.330' AS DateTime), 13)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (13, N'Pretty good', 21, CAST(N'2024-12-30T12:37:10.607' AS DateTime), 7)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (16, N'Less colors than I thought', 24, CAST(N'2024-12-31T10:31:30.547' AS DateTime), 14)
GO
INSERT [dbo].[Comments] ([Id], [CommentContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (22, N'Nice product', 25, CAST(N'2024-12-31T13:32:13.077' AS DateTime), 27)
GO
SET IDENTITY_INSERT [dbo].[Comments] OFF
GO
SET IDENTITY_INSERT [dbo].[Images] ON 
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (17, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702586/14_lehmpi.avif')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (18, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702585/1414_l1v87j.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (19, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702377/12_c0djtz.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (20, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702378/11_zgobk9.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (21, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702374/111_xd9rro.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (22, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734702380/13_f5zvjc.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (23, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698298/3_dpfsim.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (24, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698314/33_u02doe.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (25, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698316/333_xjgff4.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (26, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698301/66_aosi7n.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (27, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698302/666_faur3u.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (28, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698318/6_m9zq1d.png')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (29, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698315/10_mlt4bc.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (30, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698303/1010_xq9lnz.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (31, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698314/9_hoveac.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (32, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698301/999_f59rly.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (33, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698294/99_te5c8o.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (34, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698297/77_ryoymc.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (35, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698300/777_vpkykh.avif')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (36, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698306/7_tb2d1q.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (37, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698302/555_kc9zzh.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (38, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698307/5_rh2o6k.png')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (39, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698291/55_idjq1q.png')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (40, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698309/4_j23kdw.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (41, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698291/44_ujtgy8.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (42, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698299/2_wqxagc.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (43, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698290/1_xinatj.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (44, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1734698313/8_nd15zm.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (46, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735545524/m_hjw634.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (47, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735545521/mm_scepp5.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (48, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735546367/ss_pbmzu9.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (49, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735546362/sss_lepxcb.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (50, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735550768/o4umvta6z8vzkzz8olb3.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (51, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735550928/uvgikglt6fgadbjnhadr.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (52, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735551363/qnrpseczdthkjd6l1soq.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (53, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735551945/rlfnikkicanqrkhaccmt.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (56, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629318/qq_nv35ei.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (57, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629593/q1_ogcd1a.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (58, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629594/q2_cvvegz.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (59, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629595/q3_jh9yki.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (60, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629975/w1_ejmyne.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (61, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629975/w2_xg1ptn.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (62, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735629976/w3_u1gxjo.webp')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (63, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735630166/xsypy7dhml8q1kvmgtjk.jpg')
GO
INSERT [dbo].[Images] ([Id], [ImageUrl]) VALUES (64, N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1735641104/umyhbmtax0fxlrlmn4do.jpg')
GO
SET IDENTITY_INSERT [dbo].[Images] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (1, N'Gucci T-shirt', N'Gucci logo-print cotton T-shirt', 450, 5, 18, CAST(N'2024-12-10T10:07:48.620' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (2, N'Pepsi cola 0.5 L', N'Pepsi cola 0.5 L', 2, NULL, 18, CAST(N'2024-12-12T11:23:46.780' AS DateTime), 2)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (3, N'New Era Cap', N'New york yankees cap hat', 16, NULL, 17, CAST(N'2024-12-12T11:23:46.787' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (4, N'Celine baseball cap cotton', N'Celine baseball cap cotton', 24, NULL, 16, CAST(N'2024-12-12T11:53:37.940' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (5, N'Mesh shoes for men', N'Mesh Shoes Men Shoes Large Size Breathable Mesh Shoes Casual Shoes Sneakers Couple Shoes', 100, NULL, 18, CAST(N'2024-12-20T16:26:08.723' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (6, N'Noise cancelling headphones', N'Noise cancelling over ear headphones EAH-A800', 340, NULL, 18, CAST(N'2024-12-20T16:26:08.727' AS DateTime), 4)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (7, N'CTL Keyboard', N'Bluetooth CTL Chrome OS keyboard', 55, 4, 18, CAST(N'2024-12-20T16:26:08.727' AS DateTime), 3)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (8, N'Reading glasses for men', N'Oriopxic reading glasses for men', 37, 3, 18, CAST(N'2024-12-20T16:26:08.727' AS DateTime), 4)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (9, N'Wehilion Mens suit', N'Wehilion suits slim 3 pieces vest, jacket, pants and other', 96, 5, 17, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (10, N'Peaq 43 Inch TV', N'43 Inch TV 43aqu-5023c 2023 QLED TV , Ultra HD', 277, 4, 17, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 3)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (11, N'Samsung smart watch', N'Samsung galaxy watch FE', 138, 3, 16, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 4)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (12, N'VAN HARVEY T-shirt', N'New T-shirt for men', 21, 3, 16, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (13, N'T-shirt worldwide Black', N'T-shirt black for men S, M , L, XL', 35, 2, 16, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (14, N'Mid blue tailor suit for men', N'Mid blue tailor suit for men', 600, 1, 15, CAST(N'2024-12-20T16:26:08.730' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (15, N'Mobile device stand', N'New stand mobile devices to keep your device stables while recording', 10, 0, 18, CAST(N'2024-12-21T13:13:43.090' AS DateTime), 5)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (16, N'Gaming mouse', N'PC gaming mouse, light speed, fast move', 90, 4, 18, CAST(N'2024-12-30T11:03:58.470' AS DateTime), 3)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (22, N'Water proof gloves', N'Water proof gloves for winter, snow, rain and other situations', 50, 5, 18, CAST(N'2024-12-30T12:12:51.237' AS DateTime), 1)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (25, N'19 Pieces Kitchen Utensils and Knife Set', N'19 Pieces Kitchen Utensils and Knife Set with Block Silicone Cooking Utensils Stainless', 38, NULL, 18, CAST(N'2024-12-31T10:18:55.013' AS DateTime), 5)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (26, N'IKEA 9-piece cookware set', N'IKEA 9-piece cookware set', 60, NULL, 18, CAST(N'2024-12-31T10:21:08.770' AS DateTime), 5)
GO
INSERT [dbo].[Products] ([Id], [Title], [Description], [Price], [Rating], [CreatedByUserId], [CreatedOn], [CategoryId]) VALUES (27, N'The North Face Base Camp Voyager 62L Duffel Bag', N'The North Face Base Camp Voyager 62L Duffel Bag', 150, 5, 18, CAST(N'2024-12-31T10:27:18.283' AS DateTime), 5)
GO
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductsImages] ON 
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (1, 1, 17)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (2, 1, 18)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (3, 2, 19)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (4, 3, 20)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (5, 3, 21)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (6, 4, 22)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (7, 5, 23)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (8, 5, 24)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (9, 5, 25)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (10, 6, 26)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (11, 6, 27)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (12, 6, 28)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (13, 7, 29)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (14, 7, 30)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (15, 8, 31)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (16, 8, 32)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (17, 8, 33)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (18, 9, 34)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (19, 9, 35)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (20, 9, 36)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (21, 10, 37)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (22, 10, 38)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (23, 10, 39)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (24, 11, 40)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (25, 11, 41)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (26, 12, 42)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (27, 13, 43)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (28, 14, 44)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (29, 16, 46)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (30, 16, 47)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (31, 22, 48)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (32, 22, 49)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (33, 25, 56)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (34, 26, 57)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (35, 26, 58)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (36, 26, 59)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (37, 27, 60)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (38, 27, 61)
GO
INSERT [dbo].[ProductsImages] ([Id], [ProductId], [ImageId]) VALUES (39, 27, 62)
GO
SET IDENTITY_INSERT [dbo].[ProductsImages] OFF
GO
SET IDENTITY_INSERT [dbo].[Ratings] ON 
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (2, 2, 17, CAST(N'2024-12-25T00:00:00.000' AS DateTime), 11)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (7, 3, 18, CAST(N'2024-12-27T22:35:53.377' AS DateTime), 11)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (9, 0, 18, CAST(N'2024-12-27T22:39:00.153' AS DateTime), 15)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (12, 4, 18, CAST(N'2024-12-28T14:00:13.490' AS DateTime), 10)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (13, 4, 19, CAST(N'2024-12-30T12:26:29.290' AS DateTime), 16)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (14, 5, 19, CAST(N'2024-12-30T12:26:41.300' AS DateTime), 9)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (15, 3, 20, CAST(N'2024-12-30T12:29:05.790' AS DateTime), 10)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (16, 4, 20, CAST(N'2024-12-30T12:29:20.873' AS DateTime), 9)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (17, 3, 20, CAST(N'2024-12-30T12:32:21.643' AS DateTime), 7)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (18, 2, 21, CAST(N'2024-12-30T12:36:31.527' AS DateTime), 13)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (19, 4, 21, CAST(N'2024-12-30T12:37:00.667' AS DateTime), 7)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (20, 5, 21, CAST(N'2024-12-30T12:37:21.960' AS DateTime), 1)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (21, 1, 22, CAST(N'2024-12-30T12:46:12.053' AS DateTime), 13)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (22, 3, 22, CAST(N'2024-12-30T12:46:22.330' AS DateTime), 8)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (24, 4, 24, CAST(N'2024-12-31T10:29:33.243' AS DateTime), 27)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (25, 1, 24, CAST(N'2024-12-31T10:30:45.467' AS DateTime), 14)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (26, 5, 24, CAST(N'2024-12-31T10:31:41.680' AS DateTime), 22)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (27, 5, 25, CAST(N'2024-12-31T13:31:55.180' AS DateTime), 27)
GO
INSERT [dbo].[Ratings] ([Id], [RatingContent], [CreatedByUserId], [CreatedOn], [ProductId]) VALUES (28, 3, 25, CAST(N'2024-12-31T13:32:32.237' AS DateTime), 12)
GO
SET IDENTITY_INSERT [dbo].[Ratings] OFF
GO
SET IDENTITY_INSERT [dbo].[Regexes] ON 
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (1, N'^[a@][s\$][s\$]$')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (2, N'[a@][s\$][s\$]h[o0][l1][e3][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (3, N'b[a@][s\$][t\+][a@]rd ')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (4, N'b[e3][a@][s\$][t\+][i1][a@]?[l1]([i1][t\+]y)?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (5, N'b[e3][a@][s\$][t\+][i1][l1][i1][t\+]y')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (6, N'b[e3][s\$][t\+][i1][a@][l1]([i1][t\+]y)?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (7, N'b[i1][t\+]ch[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (8, N'b[i1][t\+]ch[e3]r[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (9, N'b[i1][t\+]ch[e3][s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (10, N'b[i1][t\+]ch[i1]ng?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (11, N'b[l1][o0]wj[o0]b[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (12, N'c[l1][i1][t\+]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (13, N'^(c|k|ck|q)[o0](c|k|ck|q)[s\$]?$')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (14, N'(c|k|ck|q)[o0](c|k|ck|q)[s\$]u')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (15, N'(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]d')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (16, N'(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]r')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (17, N'(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[i1]ng')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (18, N'(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (19, N'^cum[s\$]?$')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (20, N'cumm??[e3]r')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (21, N'cumm?[i1]ngcock')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (22, N'(c|k|ck|q)um[s\$]h[o0][t\+]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (23, N'(c|k|ck|q)un[i1][l1][i1]ngu[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (24, N'(c|k|ck|q)un[i1][l1][l1][i1]ngu[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (25, N'(c|k|ck|q)unn[i1][l1][i1]ngu[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (26, N'(c|k|ck|q)un[t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (27, N'(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (28, N'(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (29, N'(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (30, N'cyb[e3]r(ph|f)u(c|k|ck|q)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (31, N'd[a@]mn')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (32, N'd[i1]ck')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (33, N'd[i1][l1]d[o0]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (34, N'd[i1][l1]d[o0][s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (35, N'd[i1]n(c|k|ck|q)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (36, N'd[i1]n(c|k|ck|q)[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (37, N'[e3]j[a@]cu[l1]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (38, N'(ph|f)[a@]g[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (39, N'(ph|f)[a@]gg[i1]ng')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (40, N'(ph|f)[a@]gg?[o0][t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (41, N'(ph|f)[a@]gg[s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (42, N'(ph|f)[e3][l1][l1]?[a@][t\+][i1][o0]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (43, N'(ph|f)u(c|k|ck|q)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (44, N'(ph|f)u(c|k|ck|q)[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (45, N'g[a@]ngb[a@]ng[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (46, N'g[a@]ngb[a@]ng[e3]d')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (47, N'g[a@]y')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (48, N'h[o0]m?m[o0]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (49, N'h[o0]rny')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (50, N'j[a@](c|k|ck|q)\-?[o0](ph|f)(ph|f)?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (51, N'j[e3]rk\-?[o0](ph|f)(ph|f)?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (52, N'j[i1][s\$z][s\$z]?m?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (53, N'[ck][o0]ndum[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (54, N'mast(e|ur)b(8|ait|ate)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (55, N'n+[i1]+[gq]+[e3]*r+[s\$]*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (56, N'[o0]rg[a@][s\$][i1]m[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (57, N'[o0]rg[a@][s\$]m[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (58, N'p[e3]nn?[i1][s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (59, N'p[i1][s\$][s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (60, N'p[i1][s\$][s\$][o0](ph|f)(ph|f)')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (61, N'p[o0]rn')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (62, N'p[o0]rn[o0][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (63, N'p[o0]rn[o0]gr[a@]phy')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (64, N'pr[i1]ck[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (65, N'pu[s\$][s\$][i1][e3][s\$]')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (66, N'pu[s\$][s\$]y[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (67, N'[s\$][e3]x')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (68, N'[s\$]h[i1][t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (69, N'[s\$][l1]u[t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (70, N'[s\$]mu[t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (71, N'[s\$]punk[s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (72, N'[t\+]w[a@][t\+][s\$]?')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (73, N'شر.*م.*ط.*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (74, N'كس')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (75, N'ع.*ه.*ر.*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (76, N'قحب.*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (77, N'نيك.*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (78, N'(ا|أ|إ|آ)ير.*')
GO
INSERT [dbo].[Regexes] ([Id], [Regex]) VALUES (79, N'س.*ك.*س.*')
GO
SET IDENTITY_INSERT [dbo].[Regexes] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (5, N'string', N'string', N'ZWNvbW1lcmNlhdYeFxfL6lrF+xxaqdOT6ZRBICf5I5wYhhahh5', N'string', N'string', CAST(N'2024-12-14T11:17:43.137' AS DateTime), CAST(N'2024-12-14T11:17:43.137' AS DateTime), CAST(N'2024-12-14T11:18:16.243' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (6, N'b@b', N'b@b', N'ZWNvbW1lcmNlBcVFlxTgNqAQ5e/54K34i0M1sWmO/e/x9QlacG', N'b@b', N'b@b', CAST(N'2024-12-14T16:11:05.047' AS DateTime), CAST(N'2024-12-14T16:11:05.047' AS DateTime), CAST(N'2024-12-14T16:14:12.550' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (7, N'c@c', N'c@c', N'ZWNvbW1lcmNlKpzUUKOPSfGw7gYMkogN4t5PwPG7i1Pk4VOP+h', N'c@c', N'c@c', CAST(N'2024-12-14T16:15:24.493' AS DateTime), CAST(N'2024-12-14T16:15:24.493' AS DateTime), CAST(N'2024-12-14T16:15:24.493' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (8, N'cc@cc', N'cc@cc', N'ZWNvbW1lcmNlKpzUUKOPSfGw7gYMkogN4t5PwPG7i1Pk4VOP+h', N'cc@cc', N'cc@cc', CAST(N'2024-12-14T16:19:09.513' AS DateTime), CAST(N'2024-12-14T16:19:09.513' AS DateTime), CAST(N'2024-12-14T16:19:09.513' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (9, N'cc@cc', N'ccc@ccc', N'ZWNvbW1lcmNlKpzUUKOPSfGw7gYMkogN4t5PwPG7i1Pk4VOP+h', N'cc@cc', N'cc@cc', CAST(N'2024-12-14T16:20:53.703' AS DateTime), CAST(N'2024-12-14T16:20:53.703' AS DateTime), CAST(N'2024-12-14T16:20:53.703' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (15, N'cc@cc', N'cccc@cccc', N'ZWNvbW1lcmNlKpzUUKOPSfGw7gYMkogN4t5PwPG7i1Pk4VOP+h', N'cc@cc', N'cc@cc', CAST(N'2024-12-14T16:25:28.960' AS DateTime), CAST(N'2024-12-14T16:25:28.960' AS DateTime), CAST(N'2024-12-14T16:25:28.960' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (16, N'cc@cc', N'e@e', N'ZWNvbW1lcmNl6rbIyVST2Qt7eCUw8MV83rXOi5VBM+8sbMpP14', N'cc@cc', N'cc@cc', CAST(N'2024-12-14T16:27:24.687' AS DateTime), CAST(N'2024-12-14T16:27:24.687' AS DateTime), CAST(N'2024-12-14T16:27:24.687' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (17, N'cc@cc', N'f@f', N'ZWNvbW1lcmNld8paKeeh/eZsYtqjQBWm4PQh5Qtd1zPNDv6pMo4TN2I=', N'cc@cc', N'cc@cc', CAST(N'2024-12-14T16:29:14.050' AS DateTime), CAST(N'2024-12-14T16:29:14.050' AS DateTime), CAST(N'2024-12-14T16:30:54.867' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (18, N'aliahmad', N'ali@ali', N'ZWNvbW1lcmNl1+QMFhLHMcvV2iYhpxeI4nsARvBY7pdodaTM9db/rgQ=', N'Ali', N'Ahmad', CAST(N'2024-12-15T10:55:03.030' AS DateTime), CAST(N'2024-12-27T17:14:13.333' AS DateTime), CAST(N'2024-12-30T11:03:39.677' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (19, N'waleed', N'waleed@waleed', N'ZWNvbW1lcmNlLUwu33kKTP1ujLcrsq/nR5hjFsCTavcXZtByzO2uy4Q=', N'waleed', N'waleed', CAST(N'2024-12-30T12:24:59.923' AS DateTime), CAST(N'2024-12-30T12:24:59.923' AS DateTime), CAST(N'2024-12-30T12:24:59.923' AS DateTime), 50)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (20, N'yaman95', N'yaman@yaman', N'ZWNvbW1lcmNloO2PmkN1zg/AoVDt0SRfpD/bkQm48g10T3UkdZu+XLs=', N'yaman', N'yaman', CAST(N'2024-12-30T12:28:24.357' AS DateTime), CAST(N'2024-12-30T12:28:24.357' AS DateTime), CAST(N'2024-12-30T12:38:32.777' AS DateTime), 51)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (21, N'bilalbilal', N'bilal@bilal', N'ZWNvbW1lcmNl8AwD86iU1HXfFjprghe5h2iFDD0kCTIgR/qtH8tWp3U=', N'Bilal', N'Ahmad', CAST(N'2024-12-30T12:35:31.150' AS DateTime), CAST(N'2024-12-30T12:35:31.150' AS DateTime), CAST(N'2024-12-30T12:35:31.150' AS DateTime), 52)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (22, N'marcus', N'marcus@marcus', N'ZWNvbW1lcmNl+t3zYHbpUxv9mbU8AkGKxyPfThMju9aKKP+Dvd9NQ0s=', N'Marcus', N'John', CAST(N'2024-12-30T12:45:03.590' AS DateTime), CAST(N'2024-12-30T12:45:03.590' AS DateTime), CAST(N'2024-12-30T12:45:03.590' AS DateTime), 53)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (23, N'susmands', N'ss68ssg@gmail', N'ZWNvbW1lcmNlFmJvYsjxWNOpd69a5DKXLFyNd0wy7iBR4nSbCoPUSKA=', N'amoungds', N'usds', CAST(N'2024-12-30T22:05:46.050' AS DateTime), CAST(N'2024-12-30T22:05:46.050' AS DateTime), CAST(N'2024-12-30T22:05:46.050' AS DateTime), NULL)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (24, N'mike', N'mike@mike', N'ZWNvbW1lcmNlLQ+dhf36m38MgPyPQ7NiMbjO3IQQqDahqQOe/ifU4xA=', N'Mike', N'Lan', CAST(N'2024-12-31T10:28:23.370' AS DateTime), CAST(N'2024-12-31T10:28:23.370' AS DateTime), CAST(N'2024-12-31T10:28:23.370' AS DateTime), 63)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Email], [Password], [FirstName], [LastName], [CreatedOn], [UpdatedOn], [LastLoggingIn], [ImageId]) VALUES (25, N'hasan', N'hasan@hasan', N'ZWNvbW1lcmNlhN42e1IRm2XYucszLiwybqBP09YV9v9qgWy+JyX3Fm0=', N'Hasan', N'Alhasan', CAST(N'2024-12-31T13:30:27.767' AS DateTime), CAST(N'2024-12-31T13:30:27.767' AS DateTime), CAST(N'2024-12-31T13:30:27.767' AS DateTime), 64)
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK__Comments__Create__0A9D95DB] FOREIGN KEY([CreatedByUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK__Comments__Create__0A9D95DB]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK__Products__Create__07C12930] FOREIGN KEY([CreatedByUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK__Products__Create__07C12930]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories]
GO
ALTER TABLE [dbo].[ProductsImages]  WITH CHECK ADD FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[ProductsImages]  WITH CHECK ADD FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD  CONSTRAINT [FK__Ratings__Created__160F4887] FOREIGN KEY([CreatedByUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Ratings] CHECK CONSTRAINT [FK__Ratings__Created__160F4887]
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK__Users__ImageId__04E4BC85] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK__Users__ImageId__04E4BC85]
GO
/****** Object:  StoredProcedure [dbo].[SP_AddCommentToProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_AddCommentToProduct]
@CommentContent nvarchar(100),
@CreatedByUserId int,
@ProductId int
as
begin

insert into Comments (CommentContent, CreatedByUserId, CreatedOn, ProductId) values (@CommentContent, @CreatedByUserId, GETDATE() , @ProductId);

end
GO
/****** Object:  StoredProcedure [dbo].[SP_AddImage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_AddImage]
@ImageUrl nvarchar(200)
as
begin
insert into Images (ImageUrl) values (@ImageUrl);
select SCOPE_IDENTITY() as Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_AddProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_AddProduct]
@Title nvarchar(100),
@Description nvarchar(100),
@Price int,
@CreatedByUserId int,
@CategoryId int
as
begin
insert into Products (Title, Description, Price, CreatedByUserId , CategoryId , Rating, CreatedOn) values (@Title, @Description, @Price, @CreatedByUserId, @CategoryId, null, GETDATE() );
select SCOPE_IDENTITY() as Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_AddRatingToProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_AddRatingToProduct]
@RatingContent smallint,
@CreatedByUserId int,
@ProductId int
as
begin

insert into Ratings (RatingContent, CreatedByUserId, CreatedOn, ProductId) values (@RatingContent, @CreatedByUserId, GETDATE() , @ProductId);

end
GO
/****** Object:  StoredProcedure [dbo].[SP_AssignImageToProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_AssignImageToProduct]
@ImageId int,
@ProductId int
as
begin
insert into ProductsImages (ImageId, ProductId) values (@ImageId, @ProductId);
end
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangeUserData]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_ChangeUserData]
@Id int,
@FirstName nvarchar(50),
@LastName nvarchar(50),
@UserName nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(100)
as
begin
	update Users set FirstName = @FirstName, LastName = @LastName, UserName = @UserName, Email = @Email, Password = @Password, UpdatedOn = GETDATE() where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangeUserImage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_ChangeUserImage]
@Id int,
@ImageUrl nvarchar(200)
as
begin

declare @ImageId int;
set @ImageId = (select top 1 Id from Images where ImageUrl = @ImageUrl)
if @ImageId is null
	begin
		insert into Images ( ImageUrl ) values ( @ImageUrl );
		set @ImageId = SCOPE_IDENTITY();
	end
update Users set ImageId = @ImageId where Id = @Id

end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteComment]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_DeleteComment]
@Id int
as
begin
delete from Comments where Id = @Id;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteImageById]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteImageById]
@Id int
as
begin
delete from Images where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteImageByImageId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_DeleteImageByImageId]
@Id int
as
begin
delete from ProductsImages where ImageId = @Id
delete from Images where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteImageByImageUrl]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteImageByImageUrl]
@ImageUrl nvarchar(200)
as
begin
delete from Images where ImageUrl = @ImageUrl
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteProduct]
@Id int
as
begin
delete from Products where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteRating]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteRating]
@Id int
as
begin
delete from Ratings where Id = @Id;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteUserImage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_DeleteUserImage]
@Id int
as
begin
	declare @imgid int;
	set @imgid = (select ImageId from (
	select * from Users where Id = @Id) u)
	if @imgid is not null
		begin
			update Users set ImageId = null where Id = @Id
			delete from Images where Id = @imgid
		end
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllCategories]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetAllCategories] 
as
begin
select * from Categories
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllProducts]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetAllProducts]
as
begin
select * from Products order by Id desc
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBadWordsRegexes]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetBadWordsRegexes]
as
begin
select * from Regexes
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetLastProductId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetLastProductId]
as
begin
select top 1 Id from Products order by Id desc
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMaxProductsCount]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_GetMaxProductsCount]
as
begin
select count(*) as MaxProductsCount from Products
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductById]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductById]
@Id int
as
begin
select top 1 * from Products where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductCommentsByProductId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductCommentsByProductId]
@ProductId int
as 
begin
	select * from Comments where ProductId = @ProductId
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductImagesByProductId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_GetProductImagesByProductId]
@ProductId int
as 
begin
	SET NOCOUNT ON;

    SELECT 
        i.Id,
        i.ImageUrl
    FROM 
        ProductsImages pi
    INNER JOIN 
        Images i ON pi.ImageId = i.Id
    WHERE 
        pi.ProductId = @ProductId;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductRatingsByProductId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductRatingsByProductId]
@ProductId int
as 
begin
	select * from Ratings where ProductId = @ProductId
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByCategoryId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductsByCategoryId]
@CategoryId int
as
begin
	select * from Products where CategoryId = @CategoryId order by Id desc
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByCategoryIdByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetProductsByCategoryIdByPage]
@CategoryId int,
@PageNumber int,
@PageSize int
as
begin
	select * from Products where CategoryId = @CategoryId order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByFilterByCategoryIdByRatingByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetProductsByFilterByCategoryIdByRatingByPage]
@CategoryId int,
@Search nvarchar(200),
@MinPrice int,
@MaxPrice int,
@MinRating int,
@MaxRating int,
@PageNumber int,
@PageSize int
as
begin
	declare @SearchText nvarchar(200) = '%' + @Search + '%'
	select * from Products where 
		CategoryId = @CategoryId 
		and Title like @SearchText
		and Price >= @MinPrice
		and Price <= @MaxPrice
		and Rating >= @MinRating
		and Rating <= @MaxRating
	order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) 
	ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByFilterByCategoryIdWithoutRatingByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetProductsByFilterByCategoryIdWithoutRatingByPage]
@CategoryId int,
@Search nvarchar(200),
@MinPrice int,
@MaxPrice int,
@PageNumber int,
@PageSize int
as
begin
	declare @SearchText nvarchar(200) = '%' + @Search + '%'
	select * from Products where 
		CategoryId = @CategoryId 
		and Title like @SearchText
		and Price >= @MinPrice
		and Price <= @MaxPrice
	order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) 
	ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByFilterWithoutCategoryIdByRatingByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductsByFilterWithoutCategoryIdByRatingByPage]
@Search nvarchar(200),
@MinPrice int,
@MaxPrice int,
@MinRating int,
@MaxRating int,
@PageNumber int,
@PageSize int
as
begin
	declare @SearchText nvarchar(200) = '%' + @Search + '%'
	select * from Products where 
		Title like @SearchText
		and Price >= @MinPrice
		and Price <= @MaxPrice
		and Rating >= @MinRating
		and Rating <= @MaxRating
	order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) 
	ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByFilterWithoutCategoryIdWithoutRatingByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetProductsByFilterWithoutCategoryIdWithoutRatingByPage]
@Search nvarchar(200),
@MinPrice int,
@MaxPrice int,
@PageNumber int,
@PageSize int
as
begin
	declare @SearchText nvarchar(200) = '%' + @Search + '%'
	select * from Products where 
		Title like @SearchText
		and Price >= @MinPrice
		and Price <= @MaxPrice
	order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) 
	ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsByPage]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetProductsByPage]
@PageNumber int,
@PageSize int
as
begin
	select * from Products order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsBySearch]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetProductsBySearch]
@Search nvarchar(200)
as
begin
	declare @SearchString nvarchar(202) = '%' + @Search + '%' 
	select * from Products where Title like @SearchString or Description like @SearchString
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUser]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_GetUser]
@Email nvarchar(50),
@Password nvarchar(100)
as
begin
	select top 1 * from Users where Email = @Email and Password = @Password
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserById]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetUserById]
@Id int
as
begin
	select * from Users where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserImageByUserId]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetUserImageByUserId]
@Id int
as
begin

declare @imgid int;
set @imgid = (select ImageId from (
select * from Users where Id = @Id) u)
if @imgid = null
begin
select * from Users where Id = -2
end
else
begin
select top 1 * from Images where Id = @imgid
end

end
GO
/****** Object:  StoredProcedure [dbo].[SP_IsEmailExisted]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_IsEmailExisted]
@Email nvarchar(50)
as
begin
select top 1 * from Users where Email = @Email;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_Signin]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_Signin]
@UserName nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(100)
as
begin
	update Users set LastLoggingIn = GETDATE() where UserName = @UserName and Email = @Email and Password = @Password
end
GO
/****** Object:  StoredProcedure [dbo].[SP_Signup]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_Signup]
@UserName nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(100),
@FirstName nvarchar(50),
@LastName nvarchar(50)
as
begin
	insert into Users (UserName, Email, Password, FirstName, LastName, CreatedOn, UpdatedOn, LastLoggingIn) values (@UserName, @Email, @Password, @FirstName, @LastName, GETDATE() , GETDATE(), GETDATE() )
end
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateRatingForProduct]    Script Date: 07/02/2025 11:10:29 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_UpdateRatingForProduct]
@ProductId int
as
begin

declare @NewRating int;
set @NewRating = (select cast(round(avg(cast((RatingContent) as float)),0) as int) as NewRating from Ratings where ProductId = @ProductId)
update Products set Rating = @NewRating where Id = @ProductId

end
GO
USE [master]
GO
ALTER DATABASE [ECOMMERCE_DB] SET  READ_WRITE 
GO
