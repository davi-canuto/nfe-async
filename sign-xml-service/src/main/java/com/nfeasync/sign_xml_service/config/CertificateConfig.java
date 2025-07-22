package com.nfeasync.sign_xml_service.config;

import com.nfeasync.sign_xml_service.signer.Iso20022XmlSigner;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.Enumeration;

@Configuration
@RequiredArgsConstructor
public class CertificateConfig {

    @Value("${cert.path}")
    private String keyStorePath;

    @Value("${cert.password}")
    private String keyStorePassword;

    @Value("${cert.alias}")
    private String keyAlias;

    @Bean
    public Iso20022XmlSigner xmlSigner() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        try (FileInputStream fis = new FileInputStream(keyStorePath)) {
            keyStore.load(fis, keyStorePassword.toCharArray());
        }

        if (!keyStore.containsAlias(keyAlias)) {
            throw new IllegalArgumentException("Alias '" + keyAlias + "' não encontrado no KeyStore");
        }

        PrivateKey privateKey = (PrivateKey) keyStore.getKey(keyAlias, keyStorePassword.toCharArray());
        X509Certificate certificate = (X509Certificate) keyStore.getCertificate(keyAlias);

        if (privateKey == null || certificate == null) {
            throw new IllegalStateException("Erro ao carregar chave privada ou certificado do alias: " + keyAlias);
        }

        return new Iso20022XmlSigner(privateKey, certificate);
    }
}
