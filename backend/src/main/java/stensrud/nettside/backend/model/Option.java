package stensrud.nettside.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "options")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "header", nullable = false)
    private String header;

    @Column(name= "body", nullable = false)
    private String body;

    public Option(String header, String body) {
        this.header = header;
        this.body = body;
    }

    public String getHeader(){return header;}
    public String getBody(){return body;}
}
