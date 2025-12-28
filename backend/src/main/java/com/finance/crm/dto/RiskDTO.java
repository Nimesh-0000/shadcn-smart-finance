package com.finance.crm.dto;

public class RiskDTO {
    private String id;
    private String severity;
    private String title;
    private String description;
    private String type;

    public RiskDTO() {
    }

    public RiskDTO(String id, String severity, String title, String description, String type) {
        this.id = id;
        this.severity = severity;
        this.title = title;
        this.description = description;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static RiskDTOBuilder builder() {
        return new RiskDTOBuilder();
    }

    public static class RiskDTOBuilder {
        private String id;
        private String severity;
        private String title;
        private String description;
        private String type;

        public RiskDTOBuilder id(String id) {
            this.id = id;
            return this;
        }

        public RiskDTOBuilder severity(String severity) {
            this.severity = severity;
            return this;
        }

        public RiskDTOBuilder title(String title) {
            this.title = title;
            return this;
        }

        public RiskDTOBuilder description(String description) {
            this.description = description;
            return this;
        }

        public RiskDTOBuilder type(String type) {
            this.type = type;
            return this;
        }

        public RiskDTO build() {
            return new RiskDTO(id, severity, title, description, type);
        }
    }
}
