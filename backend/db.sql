CREATE DATABASE IF NOT EXISTS alo;
USE alo;

CREATE TABLE IF NOT EXISTS optimizations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  asin VARCHAR(20) NOT NULL,
  fetched JSON NOT NULL,
  optimized JSON NOT NULL,
  keywords JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index asin for faster lookups (allow multiple rows per ASIN)
CREATE INDEX idx_optimizations_asin ON optimizations(asin);
