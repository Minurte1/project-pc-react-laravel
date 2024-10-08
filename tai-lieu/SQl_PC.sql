/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/7/2024 9:45:55 AM                         */
/*==============================================================*/


alter table CHI_TIET_HOA__ON 
   drop foreign key FK_CHI_TIET_CO_CHI_TI_HOADON;

alter table CO_SAN_PHAM 
   drop foreign key FK_CO_SAN_P_CO_SAN_PH_CHI_TIET;

alter table CO_SAN_PHAM 
   drop foreign key FK_CO_SAN_P_CO_SAN_PH_SANPHAM;

alter table GIO_HANG 
   drop foreign key FK_GIO_HANG_GIO_HANG_KHACHHAN;

alter table GIO_HANG 
   drop foreign key FK_GIO_HANG_GIO_HANG2_SANPHAM;

alter table HOADON 
   drop foreign key FK_HOADON_TAO_HOA___KHACHHAN;

alter table SANPHAM 
   drop foreign key FK_SANPHAM_THUOC_LOA_THELOAI;

alter table TAI_KHOAN 
   drop foreign key FK_TAI_KHOA_CO_QUYEN_PHAN_QUY;

alter table TAI_KHOAN 
   drop foreign key FK_TAI_KHOA_CO_TAI_KH_KHACHHAN;


alter table CHI_TIET_HOA__ON 
   drop foreign key FK_CHI_TIET_CO_CHI_TI_HOADON;

drop table if exists CHI_TIET_HOA__ON;


alter table CO_SAN_PHAM 
   drop foreign key FK_CO_SAN_P_CO_SAN_PH_CHI_TIET;

alter table CO_SAN_PHAM 
   drop foreign key FK_CO_SAN_P_CO_SAN_PH_SANPHAM;

drop table if exists CO_SAN_PHAM;


alter table GIO_HANG 
   drop foreign key FK_GIO_HANG_GIO_HANG_KHACHHAN;

alter table GIO_HANG 
   drop foreign key FK_GIO_HANG_GIO_HANG2_SANPHAM;

drop table if exists GIO_HANG;


alter table HOADON 
   drop foreign key FK_HOADON_TAO_HOA___KHACHHAN;

drop table if exists HOADON;

drop table if exists KHACHHANG;

drop table if exists PHAN_QUYEN;


alter table SANPHAM 
   drop foreign key FK_SANPHAM_THUOC_LOA_THELOAI;

drop table if exists SANPHAM;


alter table TAI_KHOAN 
   drop foreign key FK_TAI_KHOA_CO_QUYEN_PHAN_QUY;

alter table TAI_KHOAN 
   drop foreign key FK_TAI_KHOA_CO_TAI_KH_KHACHHAN;

drop table if exists TAI_KHOAN;

drop table if exists THELOAI;

/*==============================================================*/
/* Table: CHI_TIET_HOA__ON                                      */
/*==============================================================*/
create table CHI_TIET_HOA__ON
(
   MA_CTHD              int not null  comment '',
   MAHD                 int not null  comment '',
   SO_LUONG             int  comment '',
   GIAM_GIA             varchar(10)  comment '',
   GHI_CHU_CTHD         varchar(5000)  comment '',
   primary key (MA_CTHD)
);

/*==============================================================*/
/* Table: CO_SAN_PHAM                                           */
/*==============================================================*/
create table CO_SAN_PHAM
(
   MA_CTHD              int not null  comment '',
   MASP                 int not null  comment '',
   primary key (MA_CTHD, MASP)
);

/*==============================================================*/
/* Table: GIO_HANG                                              */
/*==============================================================*/
create table GIO_HANG
(
   MA_KH                int not null  comment '',
   MASP                 int not null  comment '',
   SO_LUONG_SP          int  comment '',
   primary key (MA_KH, MASP)
);

/*==============================================================*/
/* Table: HOADON                                                */
/*==============================================================*/
create table HOADON
(
   MAHD                 int not null  comment '',
   MA_KH                int not null  comment '',
   DIA_CHI_SHIP         varchar(255)  comment '',
   SDT_LIEN_HE_KH       varchar(20)  comment '',
   GHI_CHU_HOA_DON      varchar(5000)  comment '',
   primary key (MAHD)
);

/*==============================================================*/
/* Table: KHACHHANG                                             */
/*==============================================================*/
create table KHACHHANG
(
   MA_KH                int not null  comment '',
   SDT_KH               varchar(20)  comment '',
   TEN_KHACH_HANG       varchar(255)  comment '',
   DIA_CHI              varchar(255)  comment '',
   GHI_CHU_KH           varchar(5000)  comment '',
   primary key (MA_KH)
);

/*==============================================================*/
/* Table: PHAN_QUYEN                                            */
/*==============================================================*/
create table PHAN_QUYEN
(
   MA_PHAN_QUYEN        int not null  comment '',
   TEN_PHAN_QUYEN       varchar(255)  comment '',
   GHI_CHU_PHAN_QUYEN   varchar(255)  comment '',
   primary key (MA_PHAN_QUYEN)
);

/*==============================================================*/
/* Table: SANPHAM                                               */
/*==============================================================*/
create table SANPHAM
(
   MASP                 int not null  comment '',
   MATL                 int not null  comment '',
   TENSP                varchar(1000)  comment '',
   DON_GIA              varchar(255)  comment '',
   TON_KHO_SP           int  comment '',
   CHIP                 varchar(1000)  comment '',
   MAIN                 varchar(1000)  comment '',
   VGA                  varchar(1000)  comment '',
   NHA_SAN_XUAT         varchar(1000)  comment '',
   RAM                  varchar(1000)  comment '',
   ROM                  varchar(1000)  comment '',
   GHI_CHU_SP           varchar(5000)  comment '',
   primary key (MASP)
);

/*==============================================================*/
/* Table: TAI_KHOAN                                             */
/*==============================================================*/
create table TAI_KHOAN
(
   MA_TK                int not null  comment '',
   MA_PHAN_QUYEN        int not null  comment '',
   MA_KH                int not null  comment '',
   TEN_DANG_NHAP        varchar(255)  comment '',
   MAT_KHAU             varchar(255)  comment '',
   primary key (MA_TK)
);

/*==============================================================*/
/* Table: THELOAI                                               */
/*==============================================================*/
create table THELOAI
(
   MATL                 int not null  comment '',
   TENTL                varchar(1000)  comment '',
   MO_TA_TL             varchar(5000)  comment '',
   GHI_CHU_TL           varchar(5000)  comment '',
   primary key (MATL)
);

alter table CHI_TIET_HOA__ON add constraint FK_CHI_TIET_CO_CHI_TI_HOADON foreign key (MAHD)
      references HOADON (MAHD) on delete restrict on update restrict;

alter table CO_SAN_PHAM add constraint FK_CO_SAN_P_CO_SAN_PH_CHI_TIET foreign key (MA_CTHD)
      references CHI_TIET_HOA__ON (MA_CTHD) on delete restrict on update restrict;

alter table CO_SAN_PHAM add constraint FK_CO_SAN_P_CO_SAN_PH_SANPHAM foreign key (MASP)
      references SANPHAM (MASP) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG_GIO_HANG_KHACHHAN foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG_GIO_HANG2_SANPHAM foreign key (MASP)
      references SANPHAM (MASP) on delete restrict on update restrict;

alter table HOADON add constraint FK_HOADON_TAO_HOA___KHACHHAN foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

alter table SANPHAM add constraint FK_SANPHAM_THUOC_LOA_THELOAI foreign key (MATL)
      references THELOAI (MATL) on delete restrict on update restrict;

alter table TAI_KHOAN add constraint FK_TAI_KHOA_CO_QUYEN_PHAN_QUY foreign key (MA_PHAN_QUYEN)
      references PHAN_QUYEN (MA_PHAN_QUYEN) on delete restrict on update restrict;

alter table TAI_KHOAN add constraint FK_TAI_KHOA_CO_TAI_KH_KHACHHAN foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

