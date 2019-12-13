CREATE DATABASE "stock-watcher"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c stock-watcher

CREATE SCHEMA stock
    AUTHORIZATION postgres;

GRANT ALL ON SCHEMA stock TO postgres;

CREATE TABLE stock.watchlist
(
    user_id bigint NOT NULL,
    user_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    symbol character varying(10) COLLATE pg_catalog."default" NOT NULL,
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_delete_time timestamp with time zone,
    CONSTRAINT pk_watchlist PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE,
     autovacuum_enabled = TRUE
)
TABLESPACE pg_default;

ALTER TABLE stock.watchlist
    OWNER to postgres;

GRANT ALL ON TABLE stock.watchlist TO postgres;

CREATE INDEX idx_watchlist_user_id
    ON stock.watchlist USING btree
    (user_id)
    TABLESPACE pg_default;