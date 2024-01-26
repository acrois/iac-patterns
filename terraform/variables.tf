variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "access_key" {
  description = "AWS access key"
  default     = "test"
}

variable "secret_key" {
  description = "AWS secret key"
  default     = "test"
}

variable "endpoint" {
  description = "LocalStack endpoint"
  default     = "http://localhost:4566"
}
