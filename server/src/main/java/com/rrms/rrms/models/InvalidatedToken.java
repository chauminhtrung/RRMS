package com.rrms.rrms.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "invalidatedToken")
public class InvalidatedToken {
  @Id
  @Column(columnDefinition = "VARCHAR(255)", nullable = false)
  private String id;
  private Date expiryTime;
}
