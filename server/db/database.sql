CREATE DATABASE "stock-watcher"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    -- LC_COLLATE = 'C'
    -- LC_CTYPE = 'C'
    -- TABLESPACE = pg_default
    -- CONNECTION LIMIT = -1;

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
    avatar character varying(100),
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    CONSTRAINT pk_user_id PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE,
     autovacuum_enabled = TRUE
);

ALTER TABLE stock.users
    OWNER to postgres;

GRANT ALL ON TABLE stock.users TO postgres;

CREATE UNIQUE INDEX idx_user_id  ON stock.users USING btree (id);


-- TABLE watchlist
CREATE TABLE stock.watchlist
(
    id bigint NOT NULL,
    symbol character varying(10) NOT NULL,
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
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

-- TABLE alerts
CREATE TABLE stock.alerts
(
	alert_id SERIAL,
    id bigint NOT NULL,
    symbol character varying(10) COLLATE pg_catalog."default" NOT NULL,
    low_price decimal,
    high_price decimal,
    sys_create_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    sys_update_time timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
    CONSTRAINT pk_alert PRIMARY KEY (alert_id),
    CONSTRAINT unique_alert UNIQUE (id, symbol, low_price),
    CONSTRAINT fk_id FOREIGN KEY (id)
        REFERENCES stock.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION)
WITH (
    OIDS = FALSE,
    autovacuum_enabled = TRUE
)
TABLESPACE pg_default;

ALTER TABLE stock.alerts
    OWNER to postgres;

GRANT ALL ON TABLE stock.alerts TO postgres;

-- Insert demo account
-- insert into stock.users(name, email, password, avatar) values ('Demo', 'demo@me.com', '$2b$05$OzRWUowDWhbedZrHt04FPudbqBAHMacvS8omL/c7c1YBif9cRDjD2', 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg')