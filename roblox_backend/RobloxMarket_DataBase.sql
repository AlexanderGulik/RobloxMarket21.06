-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 06 2025 г., 18:37
-- Версия сервера: 8.0.30
-- Версия PHP: 8.0.22
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "Europe/Moscow";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `RobloxMarket`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Category`
--

CREATE TABLE `Category` (
  `category_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Category`
--

INSERT INTO `Category` (`category_id`, `name`, `image`) VALUES
(1, 'Murder Mystery 2', '055116f0-6482-4ac0-aab5-97d0fb5e56e6.jpeg'),
(2, 'Pets GO', '54c117b5-c72c-4b5f-91ba-fe2f07809ea6.png'),
(3, 'Fisch', 'imgFishch.jpg'),
(4, 'Pet Simulator 99', 'imgPetSimulator.png'),
(5, 'Toilet Tower Defence', 'imgToilet.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `Orders`
--

CREATE TABLE `Orders` (
  `order_id` varchar(36) NOT NULL,
  `payment_id` varchar(36) NOT NULL,
  `user_id` int DEFAULT NULL,
  `telegram_name` varchar(50) NOT NULL,
  `roblox_name` varchar(60) NOT NULL,
  `phone_number` varchar(25) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `status` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- --------------------------------------------------------

--
-- Структура таблицы `Order_Items`
--

CREATE TABLE `Order_Items` (
  `order_item_id` int NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `oldCost` decimal(30,2) NOT NULL,
  `cost` decimal(30,2) NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- --------------------------------------------------------

--
-- Структура таблицы `Product`
--

CREATE TABLE `Product` (
  `product_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `oldCost` decimal(30,2) NOT NULL,
  `cost` decimal(30,2) NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Product`
--

INSERT INTO `Product` (`product_id`, `name`, `image`, `oldCost`, `cost`, `category_id`) VALUES
(1, 'Chef TV Man', '6c04a621-d1b8-41aa-a02e-ded8f9c57f37.png', '3000.00', '299.00', 5),
(2, 'Corrupted Cameraman', 'imgCorruptedCameraman.png', '4500.00', '999.00', 5),
(3, 'Glitch Cameraman', 'imgGlitchCameraman.png', '500.00', '55.00', 5),
(4, 'Katana Speakerman', 'imgKatanaSpeakerman.png', '750.00', '165.00', 5),
(5, 'Large Firework Cameraman', 'imgLargeFireworkCameraman.png', '2777.00', '549.00', 5),
(6, 'Large Laser Cameraman', 'imgLargeLaserCameraman.png', '750.00', '155.00', 5),
(7, 'Santa TV Man', 'imgSantaTVMan.png', '350.00', '266.00', 5),
(8, 'Shotgun Cameraman', 'imgShotgunCameraman.png', '777.00', '165.00', 5),
(9, 'Sinister Titan TV Man', 'imgSinisterTitanTVMan.png', '889.00', '275.00', 5),
(10, 'Titan Cinemaman', 'imgTitanCinemaman.png', '350.00', '135.00', 5),
(11, 'Upgraded Titan Cameraman', 'imgUpgradedTitanCameraman.png', '666.00', '135.00', 5),
(12, 'Upgraded Titan Speakerman', 'imgUpgradedTitanSpeakerman.png', '666.00', '135.00', 5),
(13, 'Titan Present Man', 'imgTitanPresentMan.png', '700.00', '178.00', 5),
(14, 'Upgraded Titan Cinemaman', 'imgUpgradedTitanCinemaman.png', '2650.00', '399.00', 5),
(15, 'DJ TV Man', 'imgDJTVMan.png', '15000.00', '4000.00', 5),
(16, 'Spider TV', 'imgSpiderTV.png', '7777.00', '500.00', 5),
(17, 'Engineer Cameraman', 'imgEngineerCameraman.png', '5460.00', '700.00', 5),
(18, 'Titan Clock Man', 'imgTitanClockMan.png', '1500.00', '160.00', 5),
(19, 'Speaker Repair Drone', 'imgSpeakerRepairDrone.png', '888.00', '160.00', 5),
(20, 'Flamethower Cameraman', 'imgFlamethowerCameraman.png', '999.00', '135.00', 5),
(21, 'Camera Repair Drone', 'imgCameraRepairDrone.png', '777.00', '160.00', 5),
(22, 'Ghost Cameraman', 'imgGhostCameraman.png', '659.00', '125.00', 5),
(23, 'Green Laser Cameraman', 'imgGreenLaserCameraman.png', '888.00', '160.00', 5),
(24, 'Camera Spider', 'imgCameraSpider.png', '225.00', '60.00', 5),
(25, 'Bat Speakerman', 'imgBatSpeakerman.png', '333.00', '40.00', 5),
(26, 'DJ Speakerman', 'imgDJSpeakerman.png', '333.00', '65.00', 5),
(27, 'Jetpack Cameraman', 'imgJetpackCameraman.png', '333.00', '85.00', 5),
(28, 'Mace Cameraman', 'imgMaceCameraman.png', '222.00', '105.00', 5),
(29, 'Pumpkin Farmer', 'imgPumpkinFarmer.png', '333.00', '175.00', 5),
(30, 'Reindeer Speakerman', 'imgReindeerSpeakerman.png', '188.00', '40.00', 5),
(31, 'Scientist Cameraman', 'imgScientistCameraman.png', '350.00', '140.00', 5),
(32, 'Scientist TV Man', 'imgScientistTVMan.png', '333.00', '145.00', 5),
(33, 'Shield Cameraman', 'imgShieldCameraman.png', '400.00', '105.00', 5),
(34, 'Speaker Spider', 'imgSpeakerSpider.png', '333.00', '115.00', 5),
(35, 'Titan Cameraman', 'imgTitanCameraman.png', '333.00', '90.00', 5),
(36, 'Sinister Cameraman', 'imgSinisterCameraman.png', '999.00', '200.00', 5),
(37, 'Dancing Speakerwoman', 'imgDancingSpeakerwoman.png', '45.00', '45.00', 5),
(38, 'Dark Speakerman', 'imgDarkSpeakerman.png', '45.00', '45.00', 5),
(39, 'Dual Bat Speakerman', 'imgDualBatSpeakerman.png', '45.00', '45.00', 5),
(40, 'Elf Cameraman', 'imgElfCameraman.png', '45.00', '45.00', 5),
(41, 'Frost DJ Speakerman', 'imgFrostDJSpeakerman.png', '75.00', '75.00', 5),
(42, 'Hunter Cameraman', 'imgHunterCameraman.png', '75.00', '75.00', 5),
(43, 'Jetpack Speakerman', 'imgJetpackSpeakerman.png', '55.00', '55.00', 5),
(44, 'Large Turkey Speakerman', 'imgLargeTurkeySpeakerman.png', '105.00', '105.00', 5),
(45, 'Laser Cameraman', 'imgLaserCameraman.png', '55.00', '55.00', 5),
(46, 'Laser Gun Cameraman', 'imgLaserGunCameraman.png', '55.00', '55.00', 5),
(47, 'Mech Cameraman', 'imgMechCameraman.png', '45.00', '45.00', 5),
(48, 'Ninja Cameraman', 'imgNinjaCameraman.png', '45.00', '45.00', 5),
(49, 'Secret Agent', 'imgSecretAgent.png', '55.00', '55.00', 5),
(50, 'Titan Speakerman', 'imgTitanSpeakerman.png', '75.00', '75.00', 5),
(51, 'Titan TV Man', 'imgTitanTVMan.png', '75.00', '75.00', 5),
(52, 'Hyper Upgraded Titan Speakerman', 'imgHyperUpgradedTitanSpeakerman.png', '1500.00', '699.00', 5),
(53, 'Upgraded Titan Drill Man', 'imgUpgradedTitanDrillMan.png', '47777.00', '5000.00', 5),
(54, 'Healer TV Woman', 'imgHealerTVWoman.png', '3750.00', '260.00', 5),
(55, 'Toxic Upgraded Titan Cameraman', 'imgToxicUpgradedTitanCameraman.png', '140.00', '140.00', 5),
(56, 'Titan Drill Man', 'imgTitanDrillMan.png', '999.00', '366.00', 5),
(57, 'Red Laser Cameraman', 'imgRedLaserCameraman.png', '999.00', '225.00', 5),
(58, 'Lucky Leprechaun Cameraman', 'imgLuckyLeprechaunCameraman.png', '1199.00', '160.00', 5),
(59, 'Titan Clover Man', 'imgTitanCloverMan.png', '11999.00', '600.00', 5),
(60, 'Mech bonny Titan', 'imgMechBonnyTitan.png', '2999.00', '270.00', 5),
(61, 'Egg Launcher Cameraman', 'imgEggLauncherCameraman.png', '3999.00', '100.00', 5),
(62, 'Large Bunnyman', 'imgLargeBunnyman.png', '399.00', '125.00', 5),
(63, 'Easter Speakerman', 'imgEasterSpeakerman.png', '299.00', '55.00', 5),
(64, 'Easter Crate', 'imgEasterCrate.png', '299.00', '49.00', 5),
(65, '10000 GEM', 'img10000GEM.png', '5000.00', '899.00', 5),
(66, 'Upgraded Camera Spider', 'imgUpgradedCameraSpider.png', '3679.00', '549.00', 5),
(67, 'Upgraded Mech Cameraman', 'imgUpgradedMechCameraman.png', '2599.00', '455.00', 5),
(68, 'Titan Sigma Man', 'imgTitanSigmaMan.png', '2499.00', '250.00', 5),
(69, 'Astro Upg. Titan Cameraman', 'imgAstroUpgTitanCameraman.png', '1250.00', '400.00', 5),
(70, 'Гемы 700', 'imgGems700.png', '210.00', '210.00', 5),
(71, 'Mewing TV Man', 'imgMewingTVMan.png', '159.00', '159.00', 5),
(72, 'Mace Camerawoman', 'imgMaceCamerawoman.png', '399.00', '399.00', 5),
(73, 'Scientist Mech', 'imgScientistMech.png', '459.00', '459.00', 5),
(74, 'ClockWoman', 'imgClockWoman.png', '1699.00', '555.00', 5),
(75, '1.000.000 C$', 'img1.000.000C$.png', '299.00', '59.00', 3),
(76, '3.000.000 C$', 'img3.000.000C$.png', '499.00', '149.00', 3),
(77, '5.000.000 C$', 'img5.000.000C$.png', '299.00', '239.00', 3),
(78, '10.000.000 C$', 'img10.000.000C$.png', '499.00', '475.00', 3),
(79, '25.000.000 C$', 'img25.000.000C$.png', '1299.00', '1125.00', 3),
(80, '50.000.000 C$', 'img50.000.000C$.png', '2899.00', '2049.00', 3),
(81, 'HUGE CALICO CAT', 'imgHUGECALICOCAT.png', '249.00', '25.00', 2),
(82, 'HUGE ABYSSAL JELLYFISH', 'imgHUGEABYSSALJELLYFISH.png', '499.00', '45.00', 2),
(83, 'HUGE COSMIC AXOLOTL', 'imgHUGECOSMICAXOLOTL.png', '849.00', '45.00', 2),
(84, 'HUGE CORRUPT OCTOPUS', 'imgHUGECORRUPTOCTOPUS.png', '1049.00', '349.00', 2),
(85, 'HUGE PARTY TIGER', 'imgHUGEPARTYTIGER.png', '1649.00', '849.00', 2),
(86, 'HUGE GRINCH CAT', 'imgHUGEGRINCHCAT.png', '259.00', '119.00', 2),
(87, 'HUGE PRESENT CHEST MIMIC', 'imgHUGEPRESENTCHESTMIMIC.png', '199.00', '109.00', 2),
(88, 'HUGE RED DRAGON', 'imgHUGEREDDRAGON.png', '99.00', '25.00', 2),
(89, 'HUGE SLEIGH CAT', 'imgHUGESLEIGHCAT.png', '289.00', '109.00', 2),
(90, 'HUGE EVIL SNOWMAN', 'imgHUGEEVILSNOWMAN.png', '319.00', '119.00', 2),
(91, 'HUGE GINGERBREAD DRAGON', 'imgHUGEGINGERBREADDRAGON.png', '4199.00', '1199.00', 2),
(92, 'HUGE JELLY PANDA', 'imgHUGEJELLYPANDA.png', '749.00', '229.00', 2),
(93, 'HUGE JOLLY MOOSE', 'imgHUGEJOLLYMOOSE.png', '1199.00', '399.00', 2),
(94, 'HUGE MOSAIC GRIFINN', 'imgHUGEMOSAICGRIFINN.png', '109.00', '29.00', 2),
(95, 'HUGE PILGRIM TURKEY', 'imgHUGEPILGRIMTURKEY.png', '875.00', '299.00', 2),
(96, 'HUGE REINDEER', 'imgHUGEREINDEER.png', '999.00', '499.00', 2),
(97, 'Icepiercer', 'imgIcepiercer.png', '1999.00', '1149.00', 1),
(98, 'Ice Flake', 'imgIceFlake.png', '199.00', '99.00', 1),
(99, 'Icebeam', 'imgIcebeam.png', '199.00', '99.00', 1),
(100, 'Phantom', 'imgPhantom.png', '299.00', '179.00', 1),
(101, 'Spectre', 'imgSpectre.png', '299.00', '179.00', 1),
(102, 'Flowerwood Gun', 'imgFlowerwoodGun.png', '399.00', '199.00', 1),
(103, 'Flowerwood', 'imgFlowerwood.png', '399.00', '199.00', 1),
(104, 'Borealis', 'imgBorealis.png', '469.00', '269.00', 1),
(105, 'Australis', 'imgAustralis.png', '469.00', '269.00', 1),
(106, 'Pearlshine', 'imgPearlshine.png', '249.00', '149.00', 1),
(107, 'Pearl', 'imgPearl.png', '249.00', '149.00', 1),
(108, 'Ocean', 'imgOcean.png', '389.00', '289.00', 1),
(109, 'Waves', 'imgWaves.png', '389.00', '289.00', 1),
(110, 'Bauble', 'imgBauble.png', '899.00', '699.00', 1),
(111, 'Vampire Axe', 'imgVampireAxe.png', '899.00', '699.00', 1),
(112, 'Vampire Gun', 'imgVampireGun.png', '899.00', '699.00', 1),
(113, 'Ginger Scope', 'imgGingerScope.png', '12990.00', '11990.00', 1),
(114, 'Celestial', 'imgCelestial.png', '749.00', '549.00', 1),
(115, 'Constellation', 'imgConstellation.png', '849.00', '649.00', 1),
(116, 'Swirly Axe', 'imgSwirlyAxe.png', '799.00', '699.00', 1),
(117, 'Knife Upgraded Titan Speakerman', 'imgKnifeUpgradedTitanSpeakerman.png', '156.00', '130.00', 5),
(118, 'BIG Clock Man', 'imgBIGClockMan.png', '240.00', '200.00', 5),
(119, 'Guardian Clockman', 'imgGuardianClockman.png', '240.00', '200.00', 5),
(120, '100 Time Crate', 'img100TimeCrate.png', '5519.00', '4599.00', 5),
(121, 'Clock Spider', 'imgClockSpider.png', '107.00', '89.00', 5),
(122, 'Alarm Clockman', 'imgAlarmClockman.png', '143.00', '119.00', 5),
(123, 'Chief Clockman', 'imgChiefClockman.png', '2880.00', '2400.00', 5),
(124, 'Ultimate Titan Clock Man', 'imgUltimateTitanClockMan.png', '225999.00', '10000.00', 5),
(125, 'Streamer Cameraman', 'imgStreamerCameraman.png', '1079.00', '899.00', 5),
(126, 'Future Large Clockman', 'imgFutureLargeClockman.png', '359.00', '299.00', 5),
(127, 'SHADOW TV Man', 'imgSHADOWTVMan.png', '719.00', '599.00', 5),
(128, 'Golden Future Large Clockman', 'imgGoldenFutureLargeClockman.png', '1680.00', '1400.00', 5),
(129, 'Scientist Clockman', 'imgScientistClockman.png', '240.00', '200.00', 5),
(130, 'Beret Cameraman', 'imgBeretCameraman.png', '359.00', '299.00', 5),
(131, 'Large Fanman', 'imgLargeFanman.png', '239.00', '199.00', 5),
(132, 'Fanman', 'imgFanman.png', '119.00', '99.00', 5),
(133, 'Arachid Militant Toilet', 'imgArachidMilitantToilet.png', '192.00', '160.00', 5),
(134, 'Military Mutant Toilet Girl', 'imgMilitaryMutantToiletGirl.png', '253.00', '211.00', 5),
(135, 'Titan Firework Man', 'imgTitanFireworkMan.png', '1680.00', '1400.00', 5),
(136, 'Titan Fanman', 'imgTitanFanman.png', '720.00', '600.00', 5),
(137, 'Sign Ultimate Titan Clock Man', 'imgSignUltimateTitanClockMan.png', '18000.00', '15000.00', 5),
(138, 'Sign Titan Clover Man', 'imgSignTitanCloverMan.png', '4319.00', '3599.00', 5),
(139, 'Sign Astro Upg. Titan Cameraman', 'imgSignAstroUpgTitanCameraman.png', '1080.00', '900.00', 5),
(140, 'Sign Hyper Upgraded Titan Speakerman', 'imgSignHyperUpgradedTitanSpeakerman.png', '3840.00', '3200.00', 5),
(141, 'Sign Titan TV Man', 'imgSignTitanTVMan.png', '120.00', '100.00', 5),
(142, 'Sign Large Turkey Speakerman', 'imgSignLargeTurkeySpeakerman.png', '156.00', '130.00', 5),
(143, 'Sign Sinister Cameraman', 'imgSignSinisterCameraman.png', '780.00', '650.00', 5),
(144, 'Sign Large Fanman', 'imgSignLargeFanman.png', '300.00', '250.00', 5),
(145, 'Sign Military Mutant Toilet Girl', 'imgSignMilitaryMutantToiletGirl.png', '2340.00', '1950.00', 5),
(146, 'Sign Titan Firework Man', 'imgSignTitanFireworkMan.png', '9600.00', '8000.00', 5),
(147, 'Sign Titan Clock Man', 'imgSignTitanClockMan.png', '540.00', '450.00', 5),
(148, 'Sign Upgraded Titan Cinemaman', 'imgSignUpgradedTitanCinemaman.png', '1020.00', '850.00', 5),
(149, 'Sign Titan Present Man', 'imgSignTitanPresentMan.png', '276.00', '230.00', 5),
(150, 'Sign Upgraded Titan Cameraman', 'imgSignUpgradedTitanCameraman.png', '210.00', '175.00', 5),
(151, 'Sign Titan Fanman', 'imgSignTitanFanman.png', '3900.00', '3250.00', 5),
(152, 'Sign Santa TV Man', 'imgSignSantaTVMan.png', '420.00', '350.00', 5),
(153, 'Sign Katana Speakerman', 'imgSignKatanaSpeakerman.png', '264.00', '220.00', 5),
(154, 'Sign Mech bonny Titan', 'imgSignMechBonnyTitan.png', '1170.00', '975.00', 5),
(155, 'Sign Corrupted Cameraman', 'imgSignCorruptedCameraman.png', '5988.00', '4990.00', 5),
(156, 'Sign Flamethrower Cameraman', 'imgSignFlamethrowerCameraman.png', '210.00', '175.00', 5),
(157, 'Sign Chef TV Man', 'imgSignChefTVMan.png', '2028.00', '1690.00', 5),
(158, 'Titan Sand Man', 'imgTitanSandMan.png', '180.00', '150.00', 5),
(159, 'Upgraded Large Laser Cameraman', 'imgUpgradedLargeLaserCameraman.png', '1680.00', '1400.00', 5),
(160, 'Astro Gun Cameraman', 'imgAstroGunCameraman.png', '2760.00', '2300.00', 5),
(161, 'Surfer TV Man', 'imgSurferTVMan.png', '312.00', '260.00', 5),
(162, 'Titan Beach Ball Man', 'imgTitanBeachBallMan.png', '2400.00', '2000.00', 5),
(163, 'Aquatitan Speakerman', 'imgAquatitanSpeakerman.png', '7200.00', '6000.00', 5),
(164, 'Sand Wizard Cameraman', 'imgSandWizardCameraman.png', '312.00', '260.00', 5),
(165, 'Demented Titan Cameraman', 'imgDementedTitanCameraman.png', '1920.00', '1600.00', 5),
(166, 'Golden Titan Speakerman (Предзаказ)', 'imgGoldenTitanSpeakerman.png', '96000.00', '80000.00', 5),
(167, 'Titan BoomBox Man', 'imgTitanBoomBoxMan.png', '4800.00', '4000.00', 5),
(168, 'Titan Cactus Man', 'imgTitanCactusMan.png', '20400.00', '17000.00', 5),
(169, 'Titan MeatBall Man', 'imgTitanMeatBallMan.png', '6000.00', '5000.00', 5),
(170, 'Coconut Cameraman', 'imgCoconutCameraman.png', '312.00', '260.00', 5),
(171, 'Hamburger Tv Man', 'imgHamburgerTvMan.png', '480.00', '400.00', 5),
(172, 'Titan Mogman', 'imgTitanMogman.png', '432.00', '360.00', 5),
(173, 'Buff Mutant Toilet', 'imgBuffMutantToilet.png', '240.00', '200.00', 5),
(174, 'Strider Toilet', 'imgStriderToilet.png', '90.00', '75.00', 5),
(175, 'Boss Toilet', 'imgBossToilet.png', '492.00', '410.00', 5),
(176, 'Volcanic Titan', 'imgVolcanicTitan.png', '300.00', '250.00', 5),
(177, 'Swat Mutant Toilet', 'imgSwatMutantToilet.png', '204.00', '170.00', 5),
(178, 'Saber Mutant Toilet', 'imgSaberMutantToilet.png', '228.00', '190.00', 5),
(179, 'Axe Upgraded Titan Speakerman', 'imgAxeUpgradedTitanSpeakerman.png', '600.00', '500.00', 5),
(180, 'Cage Scientist Clockman', 'imgCageScientistClockman.png', '480.00', '400.00', 5),
(181, 'Commander Cameraman', 'imgCommanderCameraman.png', '516.00', '430.00', 5),
(182, 'Sniper Cameraman', 'imgSniperCameraman.png', '192.00', '160.00', 5),
(183, 'Upgraded Titan Drilldragon', 'imgUpgradedTitanDrilldragon.png', '36000.00', '30000.00', 5),
(184, 'Armored Drillman', 'imgArmoredDrillman.png', '36.00', '30.00', 5),
(185, 'Assassin Drillman', 'imgAssassinDrillman.png', '72.00', '60.00', 5),
(186, 'Astro Large TV Man', 'imgAstroLargeTVMan.png', '168.00', '140.00', 5),
(187, 'Chief Drillman', 'imgChiefDrillman.png', '2880.00', '2400.00', 5),
(188, 'Developer Crate', 'imgDeveloperCrate.png', '24.00', '20.00', 5),
(189, 'Drillwoman', 'imgDrillwoman.png', '156.00', '130.00', 5),
(190, 'Hammer Pencilman', 'imgHammerPencilman.png', '300.00', '250.00', 5),
(191, 'Printer Man', 'imgPrinterMan.png', '6.00', '5.00', 5),
(192, 'Sergeant Drillman', 'imgSergeantDrillman.png', '84.00', '70.00', 5),
(193, 'Sigma Drillman', 'imgSigmaDrillman.png', '108.00', '90.00', 5),
(194, 'Titan Heart Man', 'imgTitanHeartMan.png', '60.00', '50.00', 5),
(195, 'Titan Printer Man', 'imgTitanPrinterMan.png', '420.00', '350.00', 5),
(196, 'Toilet Man', 'imgToiletMan.png', '54.00', '45.00', 5),
(197, 'Vampire Cameraman', 'imgVampireCameraman.png', '360.00', '300.00', 5),
(198, 'Very Important Titan', 'imgVeryImportantTitan.png', '132.00', '110.00', 5),
(199, 'Zombie Horde Cameraman', 'imgZombieHordeCameraman.png', '114.00', '95.00', 5),
(200, 'Telanthric', 'imgTelanthric.png', '3469.00', '2891.00', 5),
(201, 'King DrillMan', 'imgKingDrillMan.png', '420.00', '350.00', 5),
(202, 'Witch Camerawoman', 'imgWitchCamerawoman.png', '480.00', '400.00', 5),
(203, 'Chair', 'imgChair.png', '600.00', '500.00', 5),
(204, 'Scientist DrillMan', 'imgScientistDrillMan.png', '480.00', '400.00', 5),
(205, 'Eternal Clock Titan', 'imgEternalClockTitan.png', '480.00', '400.00', 5),
(206, 'Summoner Pencil Man', 'imgSummonerPencilMan.png', '215.00', '179.00', 5),
(207, 'Boss Toilet', 'imgBossToilet2.png', '359.00', '299.00', 5),
(208, 'Titan Pencil Woman', 'imgTitanPencilWoman.png', '959.00', '799.00', 5),
(209, 'HUGE INFERNO CAT', 'imgHUGEINFERNOCAT.png', '119.00', '19.00', 2),
(210, 'HUGE AMETHYST DRAGON', 'imgHUGEAMETHYSTDRAGON.png', '2149.00', '1349.00', 2),
(211, 'HUGE FESTIVE CAT', 'imgHUGEFESTIVECAT.png', '559.00', '169.00', 2),
(212, 'HUGE JELLY AXOLOTL', 'imgHUGEJELLYAXOLOTL.png', '899.00', '299.00', 2),
(213, 'HUGE DRAGON', 'imgHUGEDRAGON.png', '849.00', '179.00', 2),
(214, 'HUGE GHOSTFACE CAT', 'imgHUGEGHOSTFACECAT.png', '19990.00', '5399.00', 2),
(215, 'HUGE ANGRY YETI', 'imgHUGEANGRYYETI.png', '549.00', '25.00', 2),
(216, 'HUGE DALMATIAN', 'imgHUGEDALMATIAN.png', '199.00', '29.00', 2),
(217, 'HUGE SILVER DRAGON', 'imgHUGESILVERDRAGON.png', '109.00', '39.00', 2),
(218, 'TITANIC DIAMOND DRAGON', 'imgTITANICDIAMONDDRAGON.png', '49990.00', '8699.00', 2),
(219, 'TITANIC REINDEER CAT', 'imgTITANICREINDEERCAT.png', '49990.00', '8799.00', 2),
(220, 'INSTANT LUCK POTION IV', 'imgINSTANTLUCKPOTIONIV.png', '1.00', '1.00', 2),
(221, 'GOD POTION', 'imgGODPOTION.png', '35.00', '7.00', 2),
(222, 'AUTUMN GOD POTION', 'imgAUTUMNGODPOTION.png', '159.00', '89.00', 2),
(223, 'WINTER GOD POTION', 'imgWINTERGODPOTION.png', '167.00', '139.00', 2),
(224, 'JELLY GOD POTION', 'imgJELLYGODPOTION.png', '143.00', '119.00', 2),
(225, 'HOLIDAY GOD POTION', 'imgHOLIDAYGODPOTION.png', '30.00', '19.00', 2),
(226, 'MOLTEN PICKAXE', 'imgMOLTENPICKAXE.png', '515.00', '129.00', 2),
(227, 'RUNIC PICKAXE', 'imgRUNICPICKAXE.png', '49.00', '15.00', 2),
(228, 'OBSIDIAN PICKAXE', 'imgOBSIDIANPICKAXE.png', '10.00', '5.00', 2),
(229, '1.000.000 ГЕМОВ', 'img1000000ГЕМОВ.png', '5.00', '5.00', 2),
(230, '3.000.000 ГЕМОВ', 'img3000000ГЕМОВ.png', '16.00', '13.00', 2),
(231, '5.000.000 ГЕМОВ', 'img5000000ГЕМОВ.png', '18.00', '15.00', 2),
(232, '10.000.000 ГЕМОВ', 'img10000000ГЕМОВ.png', '30.00', '25.00', 2),
(233, '25.000.000 ГЕМОВ', 'img25000000ГЕМОВ.png', '60.00', '50.00', 2),
(234, '50.000.000 ГЕМОВ', 'img50000000ГЕМОВ.png', '119.00', '99.00', 2),
(235, '100.000.000 ГЕМОВ', 'img100000000ГЕМОВ.png', '239.00', '199.00', 2),
(236, '500.000.000 ГЕМОВ', 'img500000000ГЕМОВ.png', '1115.00', '929.00', 2),
(237, '1.000.000.000 ГЕМОВ', 'img1000000000ГЕМОВ.png', '2219.00', '1849.00', 2),
(238, '500.000 ГЕМОВ', 'img500000ГЕМОВ.png', '5.00', '4.00', 2),
(239, 'СORRUPTED FISHING ROD', 'imgСORRUPTEDFISHINGROD.png', '299.00', '109.00', 2),
(240, 'DIAMOND FISHING ROD', 'imgDIAMONDFISHINGROD.png', '69.00', '39.00', 2),
(241, 'FROZEN FISHING ROD', 'imgFROZENFISHINGROD.png', '29.00', '15.00', 2),
(242, 'GOLDEN FISHING ROD', 'imgGOLDENFISHINGROD.png', '29.00', '5.00', 2),
(243, 'WINTER EGG', 'imgWINTEREGG.png', '1.00', '1.00', 2),
(244, 'CELESTIAL FISHING CHEST', 'imgCELESTIALFISHINGCHEST.png', '1.00', '1.00', 2),
(245, 'NICE GIFT BAG', 'imgNICEGIFTBAG.png', '1.00', '1.00', 2),
(246, 'CELESTIAL FISHING BAIT', 'imgCELESTIALFISHINGBAIT.png', '1.00', '1.00', 2),
(247, 'ABYSSAL CHEST', 'imgABYSSALCHEST.png', '1.00', '1.00', 2),
(248, 'CELESTIAL MINING CHEST', 'imgCELESTIALMININGCHEST.png', '1.00', '1.00', 2),
(249, 'SANTA EGG', 'imgSANTAEGG.png', '1.00', '1.00', 2),
(250, 'RUNIC MINING CHEST', 'imgRUNICMININGCHEST.png', '3.00', '1.00', 2),
(251, 'SECRET KEY', 'imgSECRETKEY.png', '9.00', '6.00', 2),
(252, 'CRYSTAL KEY', 'imgCRYSTALKEY.png', '1.00', '1.00', 2),
(253, 'CORRUPTED BAIT', 'imgCORRUPTEDBAIT.png', '1.00', '1.00', 2),
(254, 'NAUGHTY GIFT BAG', 'imgNAUGHTYGIFTBAG.png', '1.00', '1.00', 2),
(255, 'HUGE EGG', 'imgHUGEEGG.png', '379.00', '219.00', 2),
(256, 'TITANIC GIFT BAG', 'imgTITANICGIFTBAG.png', '549.00', '299.00', 2),
(257, 'TITANIC MINING CHEST', 'imgTITANICMININGCHEST.png', '159.00', '85.00', 2),
(258, 'HYPE EGG', 'imgHYPEEGG.png', '29.00', '10.00', 2),
(259, 'HOLIDAY EGG', 'imgHOLIDAYEGG.png', '1.00', '1.00', 2),
(260, 'HOLIDAY GIFT BAG', 'imgHOLIDAYGIFTBAG.png', '1.00', '1.00', 2),
(261, 'NAUGHTY EGG', 'imgNAUGHTYEGG.png', '1.00', '1.00', 2),
(262, 'NICE EGG', 'imgNICEEGG.png', '1.00', '1.00', 2),
(263, 'HUGE HELL ROCK', 'imgHUGEHELLROCK.png', '65.00', '39.00', 2),
(264, 'EXCLUSIVE ENCHANT SAFE', 'imgEXCLUSIVEENCHANTSAFE.png', '79.00', '15.00', 2),
(265, 'CELESTIAL ENCHANT SAFE', 'imgCELESTIALENCHANTSAFE.png', '9.00', '1.00', 2),
(266, 'MAGMA EGG', 'imgMAGMAEGG.png', '1.00', '1.00', 2),
(267, 'PICKAXE EXPLOSIVE', 'imgPICKAXEEXPLOSIVE.png', '8.00', '3.00', 2),
(268, 'PICKAXE CHEST HUNTER', 'imgPICKAXECHESTHUNTER.png', '39.00', '19.00', 2),
(295, 'PICKAXE HUGE HUNTER', 'imgPICKAXEHUGEHUNTER.png', '399.00', '249.00', 2),
(296, 'METAL DETECTOR', 'imgMETALDETECTOR.png', '2.00', '2.00', 2),
(297, 'PICKAXE LIGHTNING', 'imgPICKAXELIGHTNING.png', '4.00', '3.00', 2),
(298, 'PIXCAXE GLITTERING', 'imgPIXCAXEGLITTERING.png', '3499.00', '1999.00', 2),
(299, 'HUGE BLACK HOLE ANGELUS', 'imgHUGEBLACKHOLEANGELUS.png', '2999.00', '999.00', 2),
(300, 'HUGE M-6 PROTOTYPE', 'imgHUGEM6PROTOTYPE.png', '7439.00', '6199.00', 2),
(301, 'HUGE GLITCHED PHOENIX', 'imgHUGEGLITCHEDPHOENIX.png', '79.00', '45.00', 2),
(302, 'HUGE SHARK', 'imgHUGESHARK.png', '159.00', '15.00', 2),
(303, 'HUGE DUCKY', 'imgHUGEDUCKY.png', '18.00', '15.00', 2),
(304, 'HUGE MONKEY', 'imgHUGEMONKEY.png', '18.00', '15.00', 2),
(305, 'INSTANT EGG CHARGE I | 1000 ШТ', 'imgINSTANTEGGCHARGEI1000ШТ.png', '4.00', '3.00', 2),
(306, 'INSTANT EGG CHARGE III | 1000 ШТ', 'imgINSTANTEGGCHARGEIII1000ШТ.png', '479.00', '399.00', 2),
(307, 'INSTANT EGG CHARGE II | 1000 ШТ', 'imgINSTANTEGGCHARGEII1000ШТ.png', '12.00', '10.00', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `user_id` int NOT NULL,
  `token` varchar(700) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `user_id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category_id`);

--
-- Индексы таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_orders_user_id` (`user_id`),
  ADD KEY `idx_orders_order_type` (`order_type`),
  ADD KEY `idx_orders_created_at` (`created_at`);

--
-- Индексы таблицы `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `idx_order_items_order_id` (`order_id`),
  ADD KEY `order_items_ibfk_2` (`category_id`);

--
-- Индексы таблицы `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Category`
--
ALTER TABLE `Category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT для таблицы `Order_Items`
--
ALTER TABLE `Order_Items`
  MODIFY `order_item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `Product`
--
ALTER TABLE `Product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;

--
-- AUTO_INCREMENT для таблицы `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`);

--
-- Ограничения внешнего ключа таблицы `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
