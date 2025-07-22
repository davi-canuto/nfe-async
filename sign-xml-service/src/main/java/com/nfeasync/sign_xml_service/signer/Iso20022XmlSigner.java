package com.nfeasync.sign_xml_service.signer;

import java.security.PrivateKey;
import java.security.cert.X509Certificate;

public class Iso20022XmlSigner extends XmlSigner {

    public Iso20022XmlSigner(PrivateKey privateKey, X509Certificate certificate) {
        super(privateKey, certificate);
    }
}
