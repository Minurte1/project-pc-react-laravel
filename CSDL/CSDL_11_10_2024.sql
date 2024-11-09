/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/11/2024 11:18:52 PM                       */
/*==============================================================*/


drop table if exists CHI_TIET_HOA__ON;

drop table if exists GIO_HANG;

drop table if exists HOADON;

drop table if exists KHACHHANG;

drop table if exists PHAN_QUYEN;

drop table if exists SANPHAM;

drop table if exists TAI_KHOAN;

drop table if exists THELOAI;

/*==============================================================*/
/* Table: CHI_TIET_HOA__ON                                      */
/*==============================================================*/
create table CHI_TIET_HOA__ON
(
   MA_CTHD              int not null,
   MASP                 int not null,
   MAHD                 int not null,
   SO_LUONG             int,
   GIAM_GIA             varchar(10),
   GHI_CHU_CTHD         text,
   primary key (MA_CTHD)
);

/*==============================================================*/
/* Table: GIO_HANG                                              */
/*==============================================================*/
create table GIO_HANG
(
   MA_KH                int not null,
   MASP                 int not null,
   SO_LUONG_SP          int,
   primary key (MA_KH, MASP)
);

/*==============================================================*/
/* Table: HOADON                                                */
/*==============================================================*/
create table HOADON
(
   MAHD                 int not null,
   MA_KH                int not null,
   DIA_CHI_SHIP         varchar(255),
   SDT_LIEN_HE_KH       varchar(20),
   GHI_CHU_HOA_DON      text,
   primary key (MAHD)
);

/*==============================================================*/
/* Table: KHACHHANG                                             */
/*==============================================================*/
create table KHACHHANG
(
   MA_KH                int not null,
   SDT_KH               varchar(20),
   TEN_KHACH_HANG       varchar(255),
   DIA_CHI              varchar(255),
   GHI_CHU_KH           text,
   primary key (MA_KH)
);

/*==============================================================*/
/* Table: PHAN_QUYEN                                            */
/*==============================================================*/
create table PHAN_QUYEN
(
   MA_PHAN_QUYEN        int not null,
   TEN_PHAN_QUYEN       varchar(255),
   GHI_CHU_PHAN_QUYEN   varchar(255),
   primary key (MA_PHAN_QUYEN)
);

/*==============================================================*/
/* Table: SANPHAM                                               */
/*==============================================================*/
create table SANPHAM
(
   MASP                 int not null,
   MATL                 int not null,
   TENSP                varchar(1000),
   DON_GIA              varchar(255),
   TON_KHO_SP           int,
   CHIP                 varchar(1000),
   MAIN                 varchar(1000),
   VGA                  varchar(1000),
   NHA_SAN_XUAT         varchar(1000),
   RAM                  varchar(1000),
   ROM                  varchar(1000),
   GHI_CHU_SP           text,
   primary key (MASP)
);

/*==============================================================*/
/* Table: TAI_KHOAN                                             */
/*==============================================================*/
create table TAI_KHOAN
(
   MA_TK                int not null,
   MA_PHAN_QUYEN        int not null,
   MA_KH                int not null,
   TEN_DANG_NHAP        varchar(255),
   MAT_KHAU             varchar(255),
   primary key (MA_TK)
);

/*==============================================================*/
/* Table: THELOAI                                               */
/*==============================================================*/
create table THELOAI
(
   MATL                 int not null,
   TENTL                varchar(1000),
   MO_TA_TL             text,
   GHI_CHU_TL           text,
   primary key (MATL)
);

alter table CHI_TIET_HOA__ON add constraint FK_CO_CHI_TIET foreign key (MAHD)
      references HOADON (MAHD) on delete restrict on update restrict;

alter table CHI_TIET_HOA__ON add constraint FK_CO_SAN_PHAM foreign key (MASP)
      references SANPHAM (MASP) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG2 foreign key (MASP)
      references SANPHAM (MASP) on delete restrict on update restrict;

alter table HOADON add constraint FK_TAO_HOA__ON foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

alter table SANPHAM add constraint FK_THUOC_LOAI foreign key (MATL)
      references THELOAI (MATL) on delete restrict on update restrict;

alter table TAI_KHOAN add constraint FK_CO_QUYEN foreign key (MA_PHAN_QUYEN)
      references PHAN_QUYEN (MA_PHAN_QUYEN) on delete restrict on update restrict;

alter table TAI_KHOAN add constraint FK_CO_TAI_KHOAN foreign key (MA_KH)
      references KHACHHANG (MA_KH) on delete restrict on update restrict;

