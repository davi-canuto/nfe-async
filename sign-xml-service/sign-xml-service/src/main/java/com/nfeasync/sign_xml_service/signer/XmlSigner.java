package com.nfeasync.sign_xml_service.signer;

import lombok.RequiredArgsConstructor;
import org.w3c.dom.Document;
import javax.xml.crypto.dsig.*;
import javax.xml.crypto.dsig.dom.DOMSignContext;
import javax.xml.crypto.dsig.keyinfo.KeyInfo;
import javax.xml.crypto.dsig.keyinfo.KeyInfoFactory;
import javax.xml.crypto.dsig.keyinfo.X509Data;
import javax.xml.crypto.dsig.spec.C14NMethodParameterSpec;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.Collections;

@RequiredArgsConstructor
public class XmlSigner {

    private final PrivateKey privateKey;
    private final X509Certificate certificate;

    public Document sign(Document document) throws Exception {
        XMLSignatureFactory factory = XMLSignatureFactory.getInstance("DOM");

        // Pega o ID do infNFe (assumindo que o elemento raiz é <NFe> ou <enviNFe>)
        String id = document.getElementsByTagName("infNFe").item(0).getAttributes().getNamedItem("Id").getTextContent();

        Reference ref = factory.newReference(
                "#" + id,
                factory.newDigestMethod(DigestMethod.SHA256, null),
                Collections.singletonList(
                        factory.newTransform(Transform.ENVELOPED, (C14NMethodParameterSpec) null)
                ),
                null,
                null
        );

        SignedInfo signedInfo = factory.newSignedInfo(
                factory.newCanonicalizationMethod(
                        CanonicalizationMethod.INCLUSIVE_WITH_COMMENTS,
                        (C14NMethodParameterSpec) null
                ),
                factory.newSignatureMethod(SignatureMethod.RSA_SHA256, null),
                Collections.singletonList(ref)
        );

        KeyInfoFactory kif = factory.getKeyInfoFactory();
        X509Data x509Data = kif.newX509Data(Collections.singletonList(certificate));
        KeyInfo keyInfo = kif.newKeyInfo(Collections.singletonList(x509Data));

        DOMSignContext domSignContext = new DOMSignContext(privateKey, document.getElementsByTagName("infNFe").item(0).getParentNode());
        domSignContext.setDefaultNamespacePrefix("ds");

        XMLSignature signature = factory.newXMLSignature(signedInfo, keyInfo);
        signature.sign(domSignContext);

        return document;
    }
}
