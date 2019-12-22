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

-- TABLE users
CREATE TABLE stock.users
(
    id SERIAL,
    name character varying(20),
    email character varying(40) NOT NULL,
    password character varying(80) NOT NULL,
    avatar character varying(50),
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_delete_time timestamp with time zone,
    CONSTRAINT pk_user_id PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE,
     autovacuum_enabled = TRUE
);

ALTER TABLE stock.users
    OWNER to postgres;

GRANT ALL ON TABLE stock.users TO postgres;

CREATE UNIQUE INDEX idx_user_id  ON stock.users USING btree (id)


-- TABLE watchlist
CREATE TABLE stock.watchlist
(
    id bigint NOT NULL,
    symbol character varying(10) NOT NULL,
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_delete_time timestamp with time zone,
    CONSTRAINT pk_watchlist PRIMARY KEY (id, symbol),
    CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES stock.users (id) MATCH SIMPLE 
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE,
     autovacuum_enabled = TRUE
);

ALTER TABLE stock.watchlist
    OWNER to postgres;

GRANT ALL ON TABLE stock.watchlist TO postgres;

