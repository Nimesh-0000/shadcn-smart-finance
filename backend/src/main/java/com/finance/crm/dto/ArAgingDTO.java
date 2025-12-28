package com.finance.crm.dto;

import java.math.BigDecimal;

public class ArAgingDTO {
    private BigDecimal current0_30;
    private BigDecimal overdue31_60;
    private BigDecimal overdue61_90;
    private BigDecimal overdue90Plus;

    public ArAgingDTO() {
    }

    public ArAgingDTO(BigDecimal current0_30, BigDecimal overdue31_60, BigDecimal overdue61_90,
            BigDecimal overdue90Plus) {
        this.current0_30 = current0_30;
        this.overdue31_60 = overdue31_60;
        this.overdue61_90 = overdue61_90;
        this.overdue90Plus = overdue90Plus;
    }

    public BigDecimal getCurrent0_30() {
        return current0_30;
    }

    public void setCurrent0_30(BigDecimal current0_30) {
        this.current0_30 = current0_30;
    }

    public BigDecimal getOverdue31_60() {
        return overdue31_60;
    }

    public void setOverdue31_60(BigDecimal overdue31_60) {
        this.overdue31_60 = overdue31_60;
    }

    public BigDecimal getOverdue61_90() {
        return overdue61_90;
    }

    public void setOverdue61_90(BigDecimal overdue61_90) {
        this.overdue61_90 = overdue61_90;
    }

    public BigDecimal getOverdue90Plus() {
        return overdue90Plus;
    }

    public void setOverdue90Plus(BigDecimal overdue90Plus) {
        this.overdue90Plus = overdue90Plus;
    }

    public static ArAgingDTOBuilder builder() {
        return new ArAgingDTOBuilder();
    }

    public static class ArAgingDTOBuilder {
        private BigDecimal current0_30;
        private BigDecimal overdue31_60;
        private BigDecimal overdue61_90;
        private BigDecimal overdue90Plus;

        public ArAgingDTOBuilder current0_30(BigDecimal current0_30) {
            this.current0_30 = current0_30;
            return this;
        }

        public ArAgingDTOBuilder overdue31_60(BigDecimal overdue31_60) {
            this.overdue31_60 = overdue31_60;
            return this;
        }

        public ArAgingDTOBuilder overdue61_90(BigDecimal overdue61_90) {
            this.overdue61_90 = overdue61_90;
            return this;
        }

        public ArAgingDTOBuilder overdue90Plus(BigDecimal overdue90Plus) {
            this.overdue90Plus = overdue90Plus;
            return this;
        }

        public ArAgingDTO build() {
            return new ArAgingDTO(current0_30, overdue31_60, overdue61_90, overdue90Plus);
        }
    }
}
